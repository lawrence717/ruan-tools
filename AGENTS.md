# AGENTS.md — Ruan.Lab Tool Archive & LLM Wiki 專案開發規範

> 本文件為本專案的最高開發規範（Project Constitution）。任何 AI Agent（包含 Codex、Cursor、Antigravity、Claude Code 等）在新增工具頁面、修改版面或整理知識庫時，**必須先完整閱讀並嚴格遵守本文件之所有規則**。

---

## 1. 專案目的與核心理念

- **專案名稱**：Ruan.Lab｜自製工具與精選工具圖鑑（Tool Archive & LLM Wiki）
- **核心目標**：打造一個具有**現代編輯與建築設計誌質感**、且可持續擴充的靜態作品與工具展示網站，統一收錄兩類工具：
  1. **自製開發（`self-built`）**：個人開發並實際部署上線的軟體與邊緣運算工具（附真實技術架構與演算法解析）。
  2. **精選外部工具（`curated`）**：經實際測試後推薦的優質外部工具與開源專案（附官方來源歸屬與應用工作流）。
- **知識架構（LLM Wiki 模式）**：本專案結合 Andrej Karpathy 提出的 **LLM Wiki** 工作流，將內容分為三層管理：
  - `raw/`：原始素材收集區（網址、零碎觀察筆記，**唯讀不改寫**）。
  - `wiki/`：由 AI 整理維護的結構化 Markdown 知識庫（含 `index.md` 與 `log.md`）。
  - `tools/`：依照標準 HTML 模板編譯產出的最終靜態網頁頁面。
- **純靜態原則**：展示網站本身不依賴任何需要編譯打包的前端框架，維持純靜態（HTML5 + CSS3 + Vanilla JS），確保本機雙擊開啟與 **GitHub Pages** 部署 100% 相容。

---

## 2. 目錄結構與檔案命名規範

```text
.
├── AGENTS.md                   # 本規範文件（通用 AI Agent 規則）
├── CLAUDE.md                   # Claude Code 快速指引（遵循 AGENTS.md）
├── README.md                   # GitHub Repository 說明文件
├── index.html                  # 網站首頁（編輯導言卡、篩選、搜尋、工具索引與擴充規範）
├── styles/
│   └── main.css                # 全域編輯設計系統（CSS 變數、石膏米白紙感、響應式排版）
├── scripts/
│   └── main.js                 # 首頁來源/分類篩選、即時搜尋、指令一鍵複製
├── tools/                      # 工具詳情子頁面資料夾
│   ├── _template.html          # 標準 HTML 骨架模板（新增頁面必須複製此檔）
│   └── NN-kebab-case.html      # 各工具介紹頁（如 01-fx-helper.html）
├── wiki/                       # LLM Wiki 結構化知識庫
│   ├── index.md                # Wiki 總目錄（每次新增工具必更新）
│   ├── log.md                  # 變更日誌（每次維護採附加寫入）
│   └── NN-kebab-case.md        # 各工具之結構化 Markdown 筆記
└── raw/                        # 原始素材區（AI 僅可讀取，禁止修改或刪除）
    └── tool-inbox.md           # 原始收集清單與未整理筆記
```

### 命名規則（嚴格執行）
1. **工具頁面與 Wiki 筆記**：一律使用兩位數編號加英文小寫連字號（kebab-case），格式為 `NN-tool-slug.html` 與 `NN-tool-slug.md`（例如 `06-prompt-tester.html`）。
2. **禁止使用中文檔名、空白字元或大寫字母**，以免在 GitHub Pages 產生網址編碼或大小寫路徑錯誤。
3. **模板保護**：`tools/_template.html` 僅作為複製範本，禁止直接覆寫其預設佔位結構，亦不可將 `_template.html` 加入首頁卡片清單。

---

## 3. 視覺風格與設計系統（Mist Ice Blue Editorial Design System）

本專案參考清晰俐落的編輯排版結構，並以 **霧冰藍（`#CCE2E8` / `rgb(204, 226, 232)`）** 為核心基底色調延伸整套協調色系，刻意去除點陣雜訊、卡通元素與 Emoji 裝飾。所有頁面共用 `styles/main.css`，**嚴禁在 HTML 內寫入衝突的 inline `style` 覆蓋全域風格**。

### 色彩規範（CSS 變數，定義於 `styles/main.css`）
- **核心主題與畫布底色（以 `#CCE2E8` 為基底調和）**：
  - `--mist: #CCE2E8` / `--mist-light: #E6F1F4` / `--mist-pale: #F3F8FA` / `--mist-deep: #B2D0D9`
  - `--canvas-top: #F5F9FB` → `--canvas-bottom: #E7F0F3`（平滑霧藍漸層背景，無點陣）
  - `--surface: #FFFFFF`（所有卡片與文章區塊之純淨表面）
- **協調字形墨色與邊線（衍生自冷霧藍 `193°` 色相）**：
  - `--ink-strong: #18313A`（深海石板藍：主標題與標題文字）
  - `--ink-body: #36505A`（深霧青灰：內文閱讀主色）
  - `--ink-muted: #637D87`（柔霧灰藍：標籤與輔助說明）
  - `--border-subtle: #C6DAE0`（1px 細緻分割線與筆記本橫線 `#E3EDF0`）
- **互動強調與分類對比色**：
  - `--fjord: #255B6E`（北歐深峽灣藍：主要操作按鈕、連結與篩選啟用狀態）
  - `--pewter: #5C676B` / `--pewter-soft: #E9ECEE`（冷白鑞灰：外部網站徽章與頂部邊線對比色）

### 字體、圖標與互動規範
- **字體組合**：標題與介面採用 `"Plus Jakarta Sans", "Noto Sans TC", sans-serif`；編號標籤與技術架構框使用 `"JetBrains Mono", ui-monospace, monospace`；全站**禁止使用圓體卡通字型與表情符號 Emoji**。
- **原創品牌識別**：頂部導覽列左側使用專案專屬極簡幾何 SVG Logo（霧冰藍 `#CCE2E8` 底色搭配 `#18313A` / `#255B6E` 線條 `R` 標誌）與 `Ruan.Lab｜由阮製作` 字樣。
- **互動設計規範**：
  - 首頁篩選列支援雙維度即時過濾：**來源（`全部來源` / `自製開發` / `外部網站`）** × **分類（`全部分類` / `生活與財務` / `開發與基建`）** × 關鍵字搜尋，並於無結果時提供一鍵重置按鈕（`#reset-filters`）。
  - 首頁每張卡片提供「架構速覽」折疊抽屜（`data-quick-toggle="spec-NN"`）。
  - 首頁下方「擴充架構說明」採可縮放橫式折疊面板（`<details id="architecture" class="archive-accordion">`）。
  - 工具詳情內頁頂部配備閱讀進度條（`#reading-progress`），技術筆記框（`.notebook-box`）提供一鍵複製按鈕。
- **響應式規範**：首頁容器 `.container` 最大寬度 `1120px`；內頁閱讀寬度 `860px`（`.article-container`）；`@media (max-width: 768px)` 下雙欄轉單欄。

---

## 4. 頁面結構與內容規範

### A. 首頁（`index.html`）卡片規格
每張工具卡片必須放在 `#tool-grid` 內（置於預留擴充卡片 `.tool-card--upcoming` 之前），並嚴格遵守以下 HTML 結構與 `data-*` 屬性：

```html
<article class="tool-card" data-origin="self-built" data-category="life-ops" data-search="關鍵字 英文 名稱">
  <div class="tool-card__top">
    <span class="index-code">INDEX 01</span>
    <!-- 自製開發用 badge--self，外部網站用 badge--curated -->
    <span class="badge badge--self">自製開發</span>
  </div>
  <h3 class="tool-card__title">工具名稱</h3>
  <p class="tool-card__desc">一句話精準說明此工具解決的痛點與核心價值（建議 40～65 字）。</p>
  <div class="tool-card__tags">
    <span class="tag">分類標籤</span>
    <span class="tag">技術標籤</span>
    <span class="tag">網域或來源</span>
  </div>
  <div id="spec-01" class="quick-spec" hidden>
    <p class="quick-spec__title">QUICK SPEC · 核心技術摘要</p>
    <p>簡要說明技術棧與關鍵實作亮點。</p>
  </div>
  <div class="tool-card__actions">
    <a class="btn btn--primary" href="tools/01-fx-helper.html">閱讀詳解</a>
    <button class="btn btn--mist" type="button" data-quick-toggle="spec-01" aria-expanded="false">架構速覽</button>
    <a class="btn btn--ghost" href="https://example.com" target="_blank" rel="noopener noreferrer">開啟網站 ↗</a>
  </div>
</article>
```

- `data-origin` 僅允許兩個值：`self-built`（自製開發）或 `curated`（外部網站）。
- `data-category` 依主題分類：`life-ops`（生活與財務）、`dev-infra`（開發與基建）。

### B. 工具詳情頁（`tools/NN-slug.html`）必備結構
每個工具子頁面必須包含以下 6 個標準區塊：
1. **頂部導覽列（`.site-header`）**：原創幾何 SVG Logo、返回工具圖鑑總覽按鈕、檢視 `AGENTS.md` 按鈕。
2. **麵包屑與工具標頭卡（`.tool-hero-card`）**：麵包屑導覽、索引編號與來源徽章、工具標題、定位摘要與外部網站連結。
3. **規格資訊矩陣（`.spec-grid`）**：包含「開發／來源歸屬」、「核心技術棧」、「適用對象」、「關鍵演算法／亮點」。
4. **痛點對照與核心模組（`.content-section`）**：使用 `.comparison-grid`（問題背景 vs 解決架構）與核心模組拆解清單。
5. **技術實作細節與筆記框（`.notebook-box` & `.callout`）**：深入說明實際運作架構、資料流或演算法設計，並附上操作流程與歸屬註記。
6. **上下篇導覽與統一頁尾（`.page-nav` & `.site-footer`）**：連接前一個與下一個工具頁面，以及統一頁尾。

---

## 5. AI 新增工具頁面的標準作業流程（5-Step SOP）

當使用者提供一個新網址、新工具名稱或原始碼檔案並要求「新增一個工具頁面」時，AI **必須依序執行以下 5 個步驟**：

### Step 1：檢視素材與判斷來源歸屬
- 讀取使用者提供的網站、原始碼摘要或 `raw/tool-inbox.md`（嚴禁記錄或洩漏任何密鑰與密碼）。
- 明確確認該工具屬於 `self-built`（自製開發）或 `curated`（精選外部工具），並決定下一個流水編號 `NN` 與英文 slug（例如 `06-mermaid-live`）。

### Step 2：更新 LLM Wiki 知識庫（`wiki/`）
- 在 `wiki/` 下建立 `NN-slug.md`，整理工具定位、核心功能、技術架構、演算法原理、使用流程與原創來源網址。
- 在 `wiki/index.md` 的目錄表格新增一列索引，並更新「下一個可用編號」。
- 在 `wiki/log.md` 附加一條本次新增的更新紀錄（格式：`YYYY-MM-DD | ADD | #NN 工具名稱 | 變更摘要`）。

### Step 3：複製模板並生成工具網頁（`tools/NN-slug.html`）
- 複製 `tools/_template.html` 建立 `tools/NN-slug.html`。
- 依 `wiki/NN-slug.md` 內容填入各區塊，並**確保所有資源皆使用相對路徑**：
  - CSS：`../styles/main.css`
  - JS：`../scripts/main.js`
  - 回首頁：`../index.html`
  - 同層頁面切換：`./05-excalidraw.html`

### Step 4：同步更新首頁索引（`index.html`）
- 在 `index.html` 的 `#tool-grid` 內（`.tool-card--upcoming` 卡片之前）插入新的 `<article class="tool-card">`。
- 同步更新 `.hero__stats` 內的統計數字，並確認 `data-origin`、`data-category`、`data-search` 皆已正確填寫。

### Step 5：串聯上下篇導覽與驗證
- 更新前一篇工具（`N-1`）頁面底部的 `.page-nav`「下一篇」連結，使其指向新建立的 `NN-slug.html`。
- 檢查所有內部 `href` 相對路徑是否正確，無死連結、無 inline style、全站統一使用繁體中文且無卡通 Emoji。

---

## 6. 原創歸屬、資安、語系與開發禁忌（Strict Rules）

1. **原創歸屬與引用規範**：
   - 收錄外部工具（`curated`）時，**必須保留官方／原作者連結與明確歸屬標註**，功能介紹與心得必須為原創整理，嚴禁直接抄襲他人網站 HTML/CSS 原始碼或文案。
2. **機敏資訊保護原則**：
   - 在網站與 `wiki/` 中撰寫自製系統的技術解析時，**嚴禁揭露真實密碼、API Token、加密 Salt 字串或私有管理後端端點密鑰**。
3. **相對路徑強制規定**：
   - 嚴禁使用以斜線開頭的絕對路徑（如 `/styles/main.css` 或 `/index.html`），否則部署至 GitHub Pages 子路徑（`https://<user>.github.io/<repo>/`）時必定破圖或失效。
4. **語系與風格一致性**：
   - 全站介面、導覽、說明文字與 Markdown 筆記統一使用**台灣習慣之繁體中文**搭配必要英文專有名詞，並維持克制內斂的編輯排版語彙（禁止加入卡通插圖或可愛表情符號）。
5. **檔案保護原則**：
   - 禁止修改或刪除 `raw/` 內的原始素材檔案。

---

## 7. 未來擴充用標準 Prompt 範本

之後若要新增工具頁面，只需對 AI 下達如下指令：

> 「請先閱讀 `AGENTS.md`，並依照 5-Step SOP 新增一個工具：工具網址是 `<URL>`，屬於 `精選外部工具`（或 `自製開發`）。請幫我整理進 `wiki/`、建立 `tools/NN-xxx.html`，並同步更新 `index.html` 與上一頁的導覽連結。」
