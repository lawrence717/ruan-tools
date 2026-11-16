# Raw Tool Inbox（原始收集素材區）

> 本檔案為唯讀原始素材紀錄（Raw Source），AI 僅可讀取並整理至 `wiki/`，請勿刪除或覆蓋原始紀錄。

## 已收錄實作網址清單

- `https://bank.ruan.edu.kg`（GitHub: `https://github.com/lawrence717/bank`）
  - 自製外匯與跨國匯款手續費比較工具（React 18 + TypeScript + Hono + Cheerio）。包含信用卡海外刷卡 1.5% 試算、臺灣銀行／玉山／國泰牌告、Yahoo Finance 交叉匯率，以及 Multi-hop 多跳匯款逆算。
- `https://ruan.edu.kg`
  - 自製極簡短網址服務（單檔 Cloudflare Workers + KV）。支援自訂短碼、備註說明、有效天數（TTL）、Turnstile 人機驗證、`ctx.waitUntil` 非同步點擊統計與 `/admin` 後台。
- `https://car.ytxhoa.de5.net`
  - 自製社區車道門禁系統（Cloudflare Workers + GAS 快照）。整合住戶申報表單（`/form`）、三層快取容錯與加嚴 SHA-256 防撞庫查詢（`/search`），以及 `/etag` USB 讀頭注音還原與 SOYAL Wiegand 34 換算助手。
