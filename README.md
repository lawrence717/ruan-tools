# Ruan.Lab｜由阮製作 · 實作工具檔案庫

一個結合 **`AGENTS.md` 規則驅動開發** 與 **LLM Wiki 知識庫架構** 的純靜態個人工具展示網站。收錄個人實際開發並部署上線的三套系統（外匯小幫手、極簡短網址服務、社區車道門禁系統），並附上真實程式碼架構與核心演算法解析。

## 專案特色

- **規則驅動擴充（`AGENTS.md` / `CLAUDE.md`）**：完整定義設計系統、HTML 骨架模板、相對路徑規範與 5 步驟新增 SOP，讓 AI 隨時可依一致風格擴充新工具頁面。
- **LLM Wiki 三層知識架構**：
  - `raw/`：原始網址與零碎筆記（唯讀素材）
  - `wiki/`：AI 維護的結構化 Markdown 知識庫（含 `index.md` 總目錄與 `log.md` 更新日誌）
  - `tools/`：依照標準模板產出的靜態 HTML 工具詳細解析頁
- **零依賴靜態部署**：純 HTML5 + CSS3 + Vanilla JS，支援分類篩選、即時搜尋與可縮放擴充說明面板，可直接透過 GitHub Pages 發布。

## 目前收錄工具

| 編號 | 名稱 | 來源類型 | 核心技術棧 | 網址 |
| :--- | :--- | :--- | :--- | :--- |
| `01` | 外匯小幫手 - 匯率與手續費比較 | 自製開發 | React 18 + Hono + Cloudflare Pages | [bank.ruan.edu.kg](https://bank.ruan.edu.kg) |
| `02` | 極簡短網址服務 | 自製開發 | Cloudflare Workers + KV + Turnstile | [ruan.edu.kg](https://ruan.edu.kg) |
| `03` | 社區車道門禁系統（含 eTag 換算助手） | 自製開發 | Cloudflare Workers + Edge Cache + GAS | [car.ytxhoa.de5.net](https://car.ytxhoa.de5.net) |

## 如何繼續新增工具頁面？

請直接對 AI 助理下達指令：

> 「請閱讀 `AGENTS.md`，並依照 5-Step SOP 新增工具 `<網址或名稱>`，幫我建立 `wiki/` 筆記與 `tools/` 網頁，並同步更新 `index.html`。」
