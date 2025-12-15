import axios from "axios";
import bs58 from "bs58";
import nacl from "tweetnacl";
import fs from "fs";
import { HttpsProxyAgent } from "https-proxy-agent";
import readline from "readline";

// ===============================
//        CONSTANTS & COLORS
// ===============================
const PLANT_TO_MB = 8192;
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

let TOTAL_MB = 0;
let TOTAL_SPAG = 0;

// ===============================
//          LOAD FILES
// ===============================
const PRIVATE_KEYS = fs.readFileSync("privatekey.txt", "utf8").trim().split("\n");
const USER_AGENTS = fs.readFileSync("user_agents.txt", "utf8").trim().split("\n");

// ===============================
//       PROFILE.TXT LOGGING
// ===============================
const PROFILE_TXT = "profile.txt";

function updateProfileTXT(pk, address, mb, spag) {
    let records = {};

    // Load old data
    if (fs.existsSync(PROFILE_TXT)) {
        const lines = fs.readFileSync(PROFILE_TXT, "utf8").trim().split("\n");

        for (let line of lines) {
            const parts = line.split("|").map(x => x.trim());
            if (parts.length >= 4) {
                const [savedPK, savedAddr, savedMB, savedSPAG] = parts;
                records[savedPK] = {
                    address: savedAddr,
                    mb: savedMB,
                    spag: savedSPAG
                };
            }
        }
    }

    // Update or insert new
    records[pk] = {
        address,
        mb,
        spag
    };

    // Save back to file
    let output = "";
    for (let key in records) {
        const r = records[key];
        output += `${key} | ${r.address} | ${r.mb} | ${r.spag}\n`;
    }

    fs.writeFileSync(PROFILE_TXT, output, "utf8");
}

// ===============================
//         PROXY MANAGER
// ===============================
let PROXIES = fs.readFileSync("proxy.txt", "utf8").trim().split("\n");
let activeProxies = new Set();
let proxyIndex = 0;

function reloadProxy() {
    PROXIES = fs.readFileSync("proxy.txt", "utf8").trim().split("\n");
}

async function getSafeProxy() {
    reloadProxy();
    let tries = 0;

    while (tries < PROXIES.length) {
        const proxy = PROXIES[proxyIndex % PROXIES.length];
        proxyIndex++;

        if (!activeProxies.has(proxy)) {
            activeProxies.add(proxy);
            return proxy;
        }
        tries++;
    }
    await new Promise(res => setTimeout(res, 1000));
    return null;
}

function releaseProxy(proxy) {
    if (proxy) activeProxies.delete(proxy);
}

// ===============================
//         USER INPUT
// ===============================
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(res => rl.question(q, ans => res(ans.trim())));

// ===============================
//           MAIN SCRIPT
// ===============================
(async () => {

    console.log(GREEN + "======== SPACEAGRI AUTO TOOL (Hacker Style) ========\n" + RESET);

    const useProxy = (await ask("- Dùng Proxy (Y/N): ")).toLowerCase() === "y";
    const threads = parseInt(await ask("- Số luồng: "), 10) || 1;

    rl.close();

    console.log(GREEN + `🚀 START | Proxy: ${useProxy ? "ON" : "OFF"} | Threads: ${threads}\n` + RESET);

    const START_TIME = Date.now();

    // ===============================
    //         WALLET PROCESSOR
    // ===============================
    async function runWallet(index) {
        const pk = PRIVATE_KEYS[index].trim();
        let proxy = null;
        let agent = null;

        while (true) {
            try {

                if (useProxy) {
                    proxy = await getSafeProxy();
                    if (!proxy) continue;
                    agent = new HttpsProxyAgent(proxy);
                }

                const ua = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
                const secretKey = bs58.decode(pk);

                if (secretKey.length !== 64) {
                    releaseProxy(proxy);
                    return;
                }

                const kp = nacl.sign.keyPair.fromSecretKey(secretKey);
                const address = bs58.encode(kp.publicKey);

                const api = axios.create({
                    baseURL: "https://api.spaceagri.com",
                    httpsAgent: agent,
                    timeout: 8000,
                    headers: {
                        "User-Agent": ua,
                        "Content-Type": "application/json"
                    }
                });

                // ===== NONCE =====
                let nonceData;
                try {
                    nonceData = await api.post("/nonce", { address });
                } catch {
                    releaseProxy(proxy);
                    continue;
                }

                const nonce = nonceData.data.data.nonce;
                const msg = new TextEncoder().encode(nonce);
                const sig = nacl.sign.detached(msg, secretKey);
                const signatureHEX = Buffer.from(sig).toString("hex");

                // ===== LOGIN =====
                let login;
                try {
                    login = await api.post("/login/wallet", {
                        address,
                        chain: "solana",
                        nonce,
                        signature: signatureHEX
                    });
                } catch {
                    releaseProxy(proxy);
                    continue;
                }

                const token = login.data.data.token;
                if (!token) {
                    releaseProxy(proxy);
                    continue;
                }

                // ===== BEFORE STATS =====
                const before = await api.get("/user/stats", {
                    headers: { Authorization: "space " + token }
                });

                let plantBefore = Number(before.data.data.plantData || 0);

                // ===== FLIP =====
                let flipRewards = [];

                for (let f = 0; f < 3; f++) {
                    const st = await api.get("/user/stats", {
                        headers: { Authorization: "space " + token }
                    });

                    let mbNow = Number(st.data.data.plantData) / PLANT_TO_MB;
                    if (mbNow < 10000) break;

                    try {
                        const fp = await api.post("/flip", {}, {
                            headers: { Authorization: "space " + token }
                        });

                        const list = fp.data?.data?.list || [];
                        const picked = list.find(x => x.selected === true);

                        if (picked) flipRewards.push(picked.preToken);

                    } catch {}

                    await new Promise(res => setTimeout(res, 400));
                }

                // ===== MINT =====
                await api.post("/mint", {}, {
                    headers: { Authorization: "space " + token }
                });

                // ===== AFTER STATS =====
                const after = await api.get("/user/stats", {
                    headers: { Authorization: "space " + token }
                });

                const plantAfter = Number(after.data.data.plantData || 0);
                const totalMB = (plantAfter / PLANT_TO_MB).toFixed(2);
                const preSPAG = Number(after.data.data.preToken || 0).toFixed(2);

                const claimMB = ((plantAfter - plantBefore) / PLANT_TO_MB).toFixed(2);
                const flipCount = flipRewards.length;

                // ==== SUM TOTALS ====
                TOTAL_MB += Number(totalMB);
                TOTAL_SPAG += Number(preSPAG);

                // ==== SAVE TO profile.txt ====
                updateProfileTXT(pk, address, totalMB, preSPAG);

                const delay = Math.floor(5000 + Math.random() * 10000);
                const delaySec = (delay / 1000).toFixed(0);

                const proxyIP = proxy ? proxy.split("@").pop() : "DIRECT";

                console.log(
                    GREEN + `W ${index + 1}` + RESET +
                    ` | ${GREEN}IP:${RESET} ${YELLOW}${proxyIP}${RESET}` +
                    ` | ${GREEN}UA:${RESET} OK ✔` +
                    ` | ${GREEN}Claim:${RESET} ${YELLOW}+${claimMB} MB${RESET}` +
                    ` | ${GREEN}MB:${RESET} ${YELLOW}${totalMB}${RESET}` +
                    ` | ${GREEN}Flip:${RESET} ${YELLOW}${flipCount}${RESET}` +
                    ` | ${GREEN}pre$SPAG:${RESET} ${YELLOW}${preSPAG}${RESET}` +
                    ` | ${GREEN}Delay:${RESET} ${YELLOW}${delaySec}s...${RESET}`
                );

                releaseProxy(proxy);
                await new Promise(res => setTimeout(res, delay));
                return;

            } catch {
                releaseProxy(proxy);
            }
        }
    }

    // ===============================
    //          THREADS
    // ===============================
    let idx = 0;

    async function worker() {
        while (true) {

            // Auto restart sau 24h
            if (Date.now() - START_TIME >= 86400000) {
                console.log(GREEN + "\n🔄 AUTO RESTART SAU 24 GIỜ...\n" + RESET);
                process.exit(1);
            }

            if (idx >= PRIVATE_KEYS.length) return;
            const i = idx++;
            await runWallet(i);
        }
    }

    let ws = [];
    for (let i = 0; i < threads; i++) ws.push(worker());
    await Promise.all(ws);

    // ===============================
    //         SUMMARY TOTAL
    // ===============================
    console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${GREEN}[SUMMARY]${RESET} Tổng MB: ${YELLOW}${TOTAL_MB.toFixed(2)} MB${RESET}
${GREEN}[SUMMARY]${RESET} Tổng pre$SPAG: ${YELLOW}${TOTAL_SPAG.toFixed(2)} SPAG${RESET}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

})();
