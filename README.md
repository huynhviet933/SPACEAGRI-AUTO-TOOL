# SPACEAGRI-AUTO-TOOL

Channel Aidrop Free : https://t.me/HVchannelss

# 🚀 SPACEAGRI AUTO TOOL — HƯỚNG DẪN SỬ DỤNG

Tool dùng để **auto login ví Solana**, **auto claim MB**, **auto flip**, **auto mint**, lưu log vào file, hỗ trợ **proxy**, **đa luồng**, và **random User-Agent**.

---

# 📌 1. YÊU CẦU MÔI TRƯỜNG

## Cài Node.js
Tải Node.js (LTS) tại:
https://nodejs.org/

css
Sao chép mã

## Cài thư viện cần thiết
Chạy lệnh:
```bash
npm install axios bs58 tweetnacl https-proxy-agent
📌 2. CẤU TRÚC THƯ MỤC
scss
Sao chép mã
📂 SpaceAgriTool
│── tool.js
│── privatekey.txt
│── proxy.txt
│── user_agents.txt
└── profile.txt (tự tạo)
📌 3. NỘI DUNG CÁC FILE TXT
✔ privatekey.txt
Mỗi dòng 1 private key dạng base58:

Sao chép mã
8sKJd2xxxxxxx...
7hbTxxxxxxx...
✔ proxy.txt
perl
Sao chép mã
http://user:pass@ip:port
socks5://user:pass@ip:port
ip:port
✔ user_agents.txt
Sao chép mã
Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Mozilla/5.0 (Linux; Android 10)
✔ profile.txt (tự tạo)
Tool tự ghi thông tin ví:

less
Sao chép mã
privateKey | address | totalMB | preSPAG
📌 4. CÁCH CHẠY TOOL
Bước 1 — tạo file txt đầy đủ
privatekey.txt

proxy.txt

user_agents.txt

Bước 2 — chạy tool
bash
Sao chép mã
node tool.js
Bước 3 — nhập cấu hình
mathematica
Sao chép mã
• Dùng proxy? (Y/N):
• Nhập số luồng:
📌 5. TOOL HOẠT ĐỘNG NHƯ THẾ NÀO
Đọc privatekey.txt

Random User-Agent

Nếu bật proxy → chọn proxy an toàn

Lấy nonce → ký → login

Lấy stats MB

Auto flip (tối đa 3 lần nếu MB ≥ 10000)

Auto mint

Ghi lại vào profile.txt

Delay random 5–15s

Lặp ví tiếp theo

Auto restart sau 24h

📌 6. LỆNH QUAN TRỌNG TRONG TOOL
Chạy nhanh:
bash
Sao chép mã
node tool.js
Xem log profile:
bash
Sao chép mã
cat profile.txt
Thêm private key:
txt
Sao chép mã
dán thêm dòng mới vào privatekey.txt
📌 7. LƯU Ý QUAN TRỌNG
Private Key phải dạng base58 Solana

Không dùng JSON dạng { "mnemonic": ... }

Proxy die → tool tự đổi

Chạy node 18+

Proxy txt có thể reload khi tool đang chạy

📌 8. TOOL DÙNG ĐỂ LÀM GÌ?
Tool này giúp bạn tự động farm dự án SpaceAgri, bao gồm:

Login ví tự động

Claim MB tự động

Flip kiếm preSPAG tự động

Mint tự động

Chạy nhiều ví cùng lúc

➡️ Hoàn toàn tự động – không cần thao tác tay.



# ❤️ Support the Developer (Donate)

If you find this project useful and want to support further development, you can donate using any of the wallets below.  
Your support means a lot — thank you! 🙏

---

## 💸 Crypto Wallets

### 🔷 EVM (ETH / BNB / Arbitrum / Polygon / Base / Linea / zkSync / Optimism / Scroll)
```
0x4bAADCd4AB4Df11D121F1662e048Dd84261c40b2
```

### 🌕 Aptos
```
0x64e46626b1213e3c0e66e733a014f4d453e322e20a0630dd428ef8e6058ae0df
```

### 🟧 Bitcoin (BTC)
```
bc1qqhxa6yvaey0fyed8gngpx2p52uhtzxfj43yju0
```

### 🔵 TON
```
UQDGarW35S8X03zr6vn-iKEoh5as69D7Ar-xU91kORsF2lLn
```

### 🟣 Sui
```
0x26924fffb59be46bd3a527a48f66babfe8d0dcb4a7084c38a18e8b56764feb66
```

### 🔺 Tron (TRX / USDT-TRC20)
```
TPhcXjHrg22kvv7jKKMrhPhBr167FFV8vN
```

### 🟩 Solana (SOL)
```
FBf5yRzFzXhi447mKNKCRedV2jVbsmmF6iRdgi3MLmga
```

---

## ⚡ Thank You!

Every donation helps keep this project alive and encourages more updates, features, and improvements.  
Thank you for your support! ❤️

---

==========================================================
                 END OF RAW GUIDE – DONE
==========================================================
