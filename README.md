# SPACEAGRI-AUTO-TOOL

Channel Aidrop Free : https://t.me/HVchannelss

Auto Cliam + Auto FLip
==========================================================
       SPACEAGRI AUTO TOOL – HƯỚNG DẪN SỬ DỤNG (RAW)
==========================================================

I. FILE CẦN CHUẨN BỊ
--------------------

1) privatekey.txt
   - Mỗi dòng 1 private key Solana (dạng base58 – 64 bytes)
   - Ví dụ:
        5K3xvFxxxxx...
        4fPq9xxxxx...

2) user_agents.txt
   - Mỗi dòng 1 User-Agent trình duyệt
   - Tool sẽ random mỗi lần gửi request

3) proxy.txt (tùy chọn)
   - Format hỗ trợ:
        http://user:pass@ip:port
        http://ip:port
   - Tool tự động tránh proxy đang dùng
   - Proxy die → tự nhảy sang proxy khác

4) profile.txt (tự tạo)
   - Không cần chuẩn bị
   - Tool tự tạo và tự cập nhật khi chạy
   - Không trùng dòng, không ghi đè bừa bãi
   - Format:
        PrivateKey | Address | MB | pre$SPAG


II. CÁCH CHẠY TOOL
--------------------

1) Cài Node.js 18+
2) Cài thư viện:
        npm install axios bs58 tweetnacl https-proxy-agent

3) Chạy lệnh:
        node up.js


III. GIẢI THÍCH CÂU HỎI KHI CHẠY
-----------------------------------

- Dùng Proxy (Y/N):
      Y → chạy bằng proxy.txt
      N → kết nối trực tiếp

- Số luồng:
      Số ví chạy song song
      Ví dụ 10 luồng = xử lý 10 ví cùng lúc


IV. CƠ CHẾ TOOL
--------------------

1) Lấy nonce → ký Solana → login
2) Lấy stats trước khi claim
3) Flip tối đa 3 lần nếu đủ MB
4) Mint
5) Lấy stats sau khi claim
6) Ghi lại thông tin vào profile.txt

7) Hệ thống tránh lỗi:
   - Proxy die → đổi proxy
   - User-Agent random
   - 1 ví chỉ xử lý đúng 1 lần rồi delay 5–15s
   - Auto Restart sau 24h để tránh treo

8) profile.txt tự cập nhật:
   - Nếu PrivateKey đã tồn tại → update MB & SPAG
   - Nếu PK mới → thêm dòng mới
   - Không bao giờ trùng lặp


V. LOG HIỂN THỊ HACKER STYLE
----------------------------

W 12 | IP:123.45.67.89 | UA OK ✔ | Claim:+145.3 MB 
     | MB: 20344.12 | Flip: 3 | pre$SPAG: 554.22 | Delay: 11s...


VI. LƯU Ý QUAN TRỌNG
----------------------

- Private key phải đúng dạng Solana SecretKey (64 bytes) decode bs58
- Không dùng private key 32 bytes → tool bỏ qua
- Nếu API SpaceAgri lag → tool tự retry
- Định dạng file phải UTF-8
---

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
