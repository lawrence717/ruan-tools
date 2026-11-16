# #02 極簡短網址服務

- **工具網址**：https://ruan.edu.kg
- **來源類型**：`self-built`（自製開發）
- **主題分類**：`dev-infra`（開發與基建）
- **適用對象**：開發者、社群內容分享者、需要自訂短碼與管理連結生命週期的使用者

## 技術棧與 Serverless 架構

- **運行環境**：單檔 **Cloudflare Workers + Cloudflare KV（`env.URL_KV`）** 全端無伺服器架構，整合前台建立頁、`/admin` 控制台與轉址引擎。
- **KV 儲存結構**：以 `URL:<slug>` 儲存目標網址、備註（`titleNote`）、點擊統計（`clicks`、`countries`、`devices`、`logs`），並將摘要放入 KV `metadata` 加速後台列表讀取。
- **原生 TTL 效期控制**：建立時若指定有效天數，直接換算秒數寫入 KV `expirationTtl`，到期由平台自動回收刪除。

## 關鍵效能與資安機制

1. **`ctx.waitUntil` 非同步無阻塞統計**：訪客點擊短網址時，先解析 `request.cf?.country` 與 `User-Agent` 裝置分類（Desktop / Mobile / Tablet），透過 `ctx.waitUntil(...)` 背景非同步寫回 KV，前台立即回傳 `302` 轉址零延遲。
2. **多層安全防護**：
   - 實作常數時間字串比對（`timingSafeEqual`）防範計時攻擊，搭配 `SHA-256` 加鹽密碼雜湊（`crypto.subtle.digest`）。
   - 支援 **Cloudflare Turnstile** 人機驗證、每 5 分鐘限流（`RATE_LIMIT_SURL`）與連續 5 次登入失敗鎖定 IP 15 分鐘（`FAIL_COUNT:<ip>`）。
   - 後台登入簽發 `HttpOnly; Secure; SameSite=Lax` Cookie 與 KV Session，並防範縮短自身網域造成無窮跳轉循環。
