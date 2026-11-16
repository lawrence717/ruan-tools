# #03 社區車道門禁系統（含 eTag 換算助手）

- **工具網址**：https://car.ytxhoa.de5.net
- **來源類型**：`self-built`（自製開發）
- **主題分類**：`life-ops`（生活與財務系統）
- **適用對象**：社區住戶、管委會（HOA）委員、物業總幹事與保全建檔人員

## 技術棧與三層快取容錯架構

- **運行架構**：**Cloudflare Workers 邊緣運算 + Google Apps Script（GAS）後端資料快照**。
- **三層快取與斷線降級（`fetchAndVerifySnapshot`）**：
  1. **實例記憶體快取（`instanceMemoryCache`）** ➔ 2. **Cloudflare Edge Cache（`caches.default`，TTL 1800 秒）** ➔ 3. **向 GAS 後端拉取快照（8.5 秒逾時保護 `AbortSignal.timeout(8500)`）**。若後端暫時逾時，自動降級提供既有快取查詢，確保社區門禁核對服務不中斷。

## 五重資安防線與 Token 比對邏輯

1. **安全標頭與傳輸防護**：HTTP 自動 301 轉 HTTPS，回傳嚴格 CSP、HSTS、`X-Frame-Options: SAMEORIGIN` 與 `nosniff`。
2. **跨站請求防禦（Anti-CSRF）**：`/api/*` 路由嚴格檢驗 `Sec-Fetch-Site` 與 `Origin` 標頭，阻擋跨站偽造請求。
3. **人機驗證與邊緣限流**：整合 Cloudflare Turnstile 與 `SEARCH_RATE_LIMITER`，同時透過 `clientSecurityTracker` 在連續失敗 5 次或每分鐘請求達 15 次時鎖定 IP 10 分鐘。
4. **精確 Token 交集 + 加嚴 SHA-256**：先將門牌與車牌/卡號進行 `NFKC` 正規化，建立 `aptTokens` 集合交集比對（徹底消除「1 號誤中 10 號／100 號」的子字串漏洞），再以 `crypto.subtle.digest('SHA-256', ...)` 比對加鹽雜湊值，結果並進行遮蔽脫敏。

## 軟硬體整合核心：`/etag` 讀頭連續換算助手

- **注音輸入法自動還原（`ZHUYIN_TO_KEY_MAP`）**：針對 USB 鍵盤模擬讀頭在中文輸入法狀態下誤掃出注音符號（如 `ㄅ`、`ㄆ`、`ㄊ`）的實務痛點，內建注音對照英文鍵盤字元自動還原表。
- **SOYAL Wiegand 34 轉換公式（`parseEpcToSoyal`）**：自動擷取 8 / 16 / 24 字元 Hex EPC 核心區段，拆成高 4 位與低 4 位 Hex 各自轉為十進位補滿 5 碼，輸出標準 `00000:00000` 門禁內碼，支援同標籤 3.5 秒防重複、音效／震動提示與 CSV / JSON 匯出。
