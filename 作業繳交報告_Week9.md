# 【TAICA 生成式 AI】Week 9 作業繳交報告

> **繳交標題格式**：`[學校簡稱] [學號] [系級簡稱] [姓名] Ruan.Lab（由阮製作）：以 AGENTS.md 與 LLM Wiki 打造可持續擴充的工具檔案庫`  
> *(請將中括號內文字替換為你的個人資料後貼上繳交區)*

---

## 一、專案簡介與相關連結

- **專案名稱**：**Ruan.Lab｜由阮製作 · 實作工具檔案庫（Tool Archive & LLM Wiki）**
- **專案簡介**：  
  本專案結合課堂教授的 **`AGENTS.md` / `CLAUDE.md` 規則驅動開發** 與 **LLM Wiki 三層知識庫架構（`raw/` ➔ `wiki/` ➔ `tools/`）**，打造一個兼具編輯藝廊質感且可持續擴充的個人作品檔案庫。  
  網站完整收錄並深入解析了我實際開發並部署上線的三套系統之真實架構與演算法：**外匯小幫手 `bank.ruan.edu.kg`**（React 18 + Hono 雙運行環境與 Multi-hop 逆算演算法）、**極簡短網址服務 `ruan.edu.kg`**（單檔 Cloudflare Workers + KV 與 `ctx.waitUntil` 非阻塞統計）、以及**社區車道門禁系統 `car.ytxhoa.de5.net`**（三層邊緣快取、加嚴 SHA-256 防撞庫與注音鍵位還原轉 SOYAL Wiegand 34 演算法）。
- **GitHub Repository 連結**：`[請貼上你的 GitHub Repository 網址，例如 https://github.com/你的帳號/ruan-tool-archive]`
- **網頁連結（GitHub Pages）**：`[請貼上你的 GitHub Pages 公開網址，例如 https://你的帳號.github.io/ruan-tool-archive/]`

---

## 二、專案架構與 LLM Wiki 設計

```text
week9 HW/
├── AGENTS.md                   # 核心規則書：設計系統、命名規範、HTML 模板與 5-Step 擴充 SOP
├── CLAUDE.md                   # Claude Code 專用快速檢核清單（對齊 AGENTS.md）
├── README.md                   # Repository 專案說明
├── index.html                  # 首頁（支援來源/分類雙維度篩選、架構速覽抽屜與可縮放擴充面板）
├── styles/main.css             # 霧冰藍主題設計系統（以 #CCE2E8 為基底搭配協調石板藍字色）
├── scripts/main.js             # 雙維度篩選、搜尋、架構速覽、閱讀進度條與一鍵複製
├── tools/                      # 工具詳細解析網頁層
│   ├── _template.html          # 標準空白骨架模板（供 AI 複製擴充）
│   ├── 01-fx-helper.html       # #01 外匯小幫手（React 18 + Hono + Cheerio 實作解析）
│   ├── 02-url-shortener.html   # #02 極簡短網址服務（CF Workers + KV + Turnstile 實作解析）
│   └── 03-community-gate.html  # #03 社區車道門禁系統（Edge Cache + SHA-256 + Wiegand 34 解析）
├── wiki/                       # LLM Wiki 結構化 Markdown 知識庫
│   ├── index.md                # 知識庫總目錄與下一個可用編號
│   ├── log.md                  # AI 維護變更日誌（Changelog）
│   └── 01~03-*.md              # 各工具結構化技術知識檔案
└── raw/
    └── tool-inbox.md           # 唯讀原始素材區（未整理網址與觀察筆記）
```

---

## 三、`AGENTS.md` 核心設計摘要

> *(繳交時請直接附上根目錄 `AGENTS.md` 之完整文字)*

1. **專案目的與核心理念**：明確定義收錄規則、LLM Wiki 三層分工（`raw/` ➔ `wiki/` ➔ `tools/`），以及純靜態零編譯原則。
2. **目錄結構與檔案命名規範**：強制使用 `NN-kebab-case.html` 與 `.md` 命名，保護 `tools/_template.html` 與 `raw/` 不被破壞。
3. **視覺風格與設計系統**：以霧冰藍（`#CCE2E8`）為基底，搭配協調的深海石板藍（`#18313A`）、深霧青灰（`#36505A`）與峽灣藍（`#255B6E`）字形與互動色票，採用平滑漸層背景（無點陣、無卡通插圖與表情符號）、Plus Jakarta Sans / Noto Sans TC / JetBrains Mono 字體與橫線技術筆記框（`.notebook-box`），禁止使用 inline style。
4. **頁面結構與內容規範**：定義首頁 `.tool-card` 必要的 `data-origin`、`data-category`、`data-search` 屬性，以及子頁面的 6 大標準區塊骨架。
5. **AI 新增工具頁面的 5-Step SOP**：Step 1 檢視素材與歸屬 ➔ Step 2 更新 `wiki/NN-slug.md`、`index.md`、`log.md` ➔ Step 3 複製 `_template.html` 建立子頁（強制相對路徑） ➔ Step 4 更新首頁 `#tool-grid` 與統計數字 ➔ Step 5 串聯上一頁導覽連結並檢查語系與資安。
6. **原創歸屬、資安、語系與開發禁忌**：規定外部工具必須標註官方連結與原創心得、技術解析絕不揭露真實密鑰或 Salt、嚴禁使用 `/` 開頭絕對路徑以免 GitHub Pages 破圖、全站統一使用繁體中文。

---

## 四、簡短說明：如果之後要新增一個新的頁面或內容，我設計的規則可以如何幫助 AI 繼續完成？

與單次 Vibe Coding 不同，我設計的 `AGENTS.md` 就像是一份給 AI 看的**「專案憲法與標準作業手冊」**。當我日後開發出第 4 個小工具或想新增其他好用工具時，不需要重新跟 AI 解釋網站配色、技術解析寫法或檔案放哪裡，只需提供新網址或核心程式摘要並請 AI 閱讀 `AGENTS.md`，就能幫助 AI 精準完成以下工作：

1. **自動維持知識庫與網頁雙向同步（LLM Wiki 工作流）**：AI 讀取素材後，會先依規範在 `wiki/` 整理出涵蓋技術棧、架構流程與演算法的 Markdown 筆記，並同步更新 `wiki/index.md` 與 `wiki/log.md`，讓知識庫持續累積而不失憶。
2. **零誤差套用一致排版與和諧色系**：AI 不必憑空猜測 HTML 結構或自行亂換配色，只需複製 `tools/_template.html` 並套用 `styles/main.css` 定義好的 `.spec-grid`、`.comparison-grid`、`.notebook-box` 與 `.callout` 元件，保證第 4 頁與前 3 頁的編輯質感 100% 一致。
3. **確保首頁篩選、資安邊界與 GitHub Pages 部署不壞掉**：規則中寫死了 `data-origin` / `data-category` 卡片格式、相對路徑規範（`../styles/main.css`）、密鑰不外洩原則以及「串聯上一頁導覽連結」的 5-Step SOP，AI 執行完後首頁的搜尋、分類篩選與前後頁跳轉都會立刻正常運作，真正達到「用規則讓網站持續生長」的目標。
