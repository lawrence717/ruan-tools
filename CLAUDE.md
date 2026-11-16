# CLAUDE.md

本專案的所有編輯設計系統、檔案命名規範、頁面骨架與擴充流程，統一以根目錄的 [`AGENTS.md`](./AGENTS.md) 為唯一真實來源（Single Source of Truth）。

## 給 Claude / AI Agent 的快速執行檢查清單

在執行任何新增工具、修改版面或整理筆記的任務前，請先完整閱讀 `AGENTS.md`，並確認完成以下動作：

1. **先讀取**：檢視 `AGENTS.md` 第 2～5 節，以及 `wiki/index.md` 確認目前最新編號 `NN`。
2. **維護 Wiki**：
   - 不可修改 `raw/` 內的原始素材。
   - 於 `wiki/NN-slug.md` 建立結構化筆記（包含技術棧與實作細節），並同步更新 `wiki/index.md` 與 `wiki/log.md`。
3. **保持設計系統規範**：
   - 沿用 `styles/main.css` 以霧冰藍（`#CCE2E8`）為基底的協調冷色階（`#F5F9FB` → `#E7F0F3` 漸層底色、`#FFFFFF` 卡片、`#18313A` 深石板藍標題、`#255B6E` 峽灣藍強調色），不使用點陣背景。
4. **產生網頁**：
   - 複製 `tools/_template.html` 建立 `tools/NN-slug.html`。
   - 所有連結與資源一律使用相對路徑（`../styles/main.css`、`../scripts/main.js`、`../index.html`）。
5. **同步索引與導覽**：
   - 在 `index.html` 的 `#tool-grid`（`.tool-card--upcoming` 之前）加入對應 `.tool-card`（正確設定 `data-origin`、`data-category`、`data-search`）。
   - 更新上一篇 `tools/(N-1)-*.html` 底部的「下一篇」連結。
6. **語系、歸屬與資安檢查**：
   - 全站統一使用繁體中文，外部工具必須附官方來源連結，且絕不寫入任何真實密鑰、密碼或 Salt 字串。
