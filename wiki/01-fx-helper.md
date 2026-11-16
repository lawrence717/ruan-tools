# #01 外匯小幫手 - 匯率與手續費比較

- **工具網址**：https://bank.ruan.edu.kg
- **開源倉庫**：https://github.com/lawrence717/bank
- **來源類型**：`self-built`（自製開發）
- **主題分類**：`life-ops`（生活與財務系統）
- **適用對象**：海外留學生、旅外工作者、常有海外刷卡或跨境電匯需求的使用者

## 技術棧與雙重部署架構

- **前端介面**：React 18 + TypeScript + Vite + Tailwind CSS + Lucide React（模組化分為 `BankRatesBoard.tsx`、`CreditCardCompare.tsx`、`FxCalculator.tsx` 與 `App.tsx` 多跳逆算主邏輯）。
- **後端框架**：Hono（`api-hono.ts`），同時支援 **Cloudflare Pages Functions**（`functions/api/[[route]].ts`）與 **Node.js 容器**（`server.ts` via `@hono/node-server`）雙部署模式。
- **快取機制**：後端實作 `Map` 記憶體快取（`CACHE_TTL = 5 * 60 * 1000`），降低重複請求外部匯率來源遭限流之風險。

## 三大匯率資料來源

1. **臺灣銀行（BOT）**：抓取 `rate.bot.com.tw` 牌告網頁並以 `cheerio` 解析 HTML 表格（現金／即期買賣價）。
2. **玉山銀行與國泰世華銀行**：串接銀行對外匯率查詢介面，取得台幣對主要外幣之即時牌告。
3. **Yahoo Finance**：串接 `query1.finance.yahoo.com/v8/finance/chart` 補足國際交叉匯率與歷史走勢數據。

## 核心演算法設計

1. **Multi-hop 跨國匯款逆向成本計算**：根據目標實領外幣金額 $A_{\text{target}}$，支援直匯與經由 USD 等中轉路徑計算，加計匯出手續費（例如 0.05%、低消 NT$100 上限 NT$800）、郵電費與中轉行全額到行費，產出實質匯率並依總支出台幣由低至高排名。
2. **海外刷卡淨回饋試算**：計算外幣基準台幣 + 1.5% 海外交易手續費（四捨五入） - 信用卡現金回饋，直接判斷回饋率高於或低於 1.5% 的實際淨損益。
