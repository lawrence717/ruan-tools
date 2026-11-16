/* ============================================================
   Ruan.Lab｜由阮製作 — 互動控制腳本 (scripts/main.js)
   功能：雙維度篩選、搜尋、重置篩選、卡片架構速覽、擴充面板、複製按鈕、閱讀進度條
   ============================================================ */

(function () {
  "use strict";

  function initFiltering() {
    const grid = document.getElementById("tool-grid");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll(".tool-card[data-origin]"));
    const upcomingCard = grid.querySelector(".tool-card--upcoming");
    const originButtons = Array.from(document.querySelectorAll("[data-filter-origin]"));
    const categoryButtons = Array.from(document.querySelectorAll("[data-filter-category]"));
    const searchInput = document.getElementById("tool-search");
    const emptyState = document.getElementById("empty-state");
    const resetBtn = document.getElementById("reset-filters");
    const visibleCountEl = document.getElementById("visible-count");

    let activeOrigin = "all";
    let activeCategory = "all";
    let keyword = "";

    function renderFilter() {
      let visibleCount = 0;
      const q = keyword.trim().toLowerCase();

      cards.forEach((card) => {
        const cardOrigin = card.getAttribute("data-origin") || "";
        const cardCategory = card.getAttribute("data-category") || "";
        const searchBlob = (
          (card.getAttribute("data-search") || "") +
          " " +
          card.textContent
        ).toLowerCase();

        const matchOrigin = activeOrigin === "all" || cardOrigin === activeOrigin;
        const matchCategory = activeCategory === "all" || cardCategory === activeCategory;
        const matchKeyword = q === "" || searchBlob.includes(q);

        const show = matchOrigin && matchCategory && matchKeyword;
        card.classList.toggle("is-hidden", !show);
        if (show) visibleCount += 1;
      });

      if (upcomingCard) {
        const showUpcoming = activeOrigin === "all" && activeCategory === "all" && q === "";
        upcomingCard.classList.toggle("is-hidden", !showUpcoming);
      }

      if (visibleCountEl) {
        visibleCountEl.textContent = String(visibleCount);
      }
      if (emptyState) {
        emptyState.classList.toggle("is-visible", visibleCount === 0);
      }
    }

    originButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeOrigin = btn.getAttribute("data-filter-origin") || "all";
        originButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        renderFilter();
      });
    });

    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-filter-category") || "all";
        categoryButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        renderFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (event) => {
        keyword = event.target.value || "";
        renderFilter();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        activeOrigin = "all";
        activeCategory = "all";
        keyword = "";
        if (searchInput) searchInput.value = "";
        originButtons.forEach((b) =>
          b.classList.toggle("is-active", b.getAttribute("data-filter-origin") === "all")
        );
        categoryButtons.forEach((b) =>
          b.classList.toggle("is-active", b.getAttribute("data-filter-category") === "all")
        );
        renderFilter();
      });
    }

    renderFilter();
  }

  function initQuickSpecs() {
    const toggleButtons = Array.from(document.querySelectorAll("[data-quick-toggle]"));
    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-quick-toggle");
        const panel = targetId ? document.getElementById(targetId) : null;
        if (!panel) return;

        const isHidden = panel.hasAttribute("hidden");
        if (isHidden) {
          panel.removeAttribute("hidden");
          btn.textContent = "收合速覽";
          btn.setAttribute("aria-expanded", "true");
        } else {
          panel.setAttribute("hidden", "");
          btn.textContent = "架構速覽";
          btn.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  function initAccordion() {
    const accordion = document.getElementById("architecture");
    if (!accordion) return;

    const hintLabel = accordion.querySelector(".archive-accordion__hint span");
    function syncHint() {
      if (hintLabel) {
        hintLabel.textContent = accordion.open ? "點擊收合說明" : "點擊展開完整說明";
      }
    }

    accordion.addEventListener("toggle", syncHint);
    syncHint();

    const archLinks = Array.from(document.querySelectorAll('a[href="#architecture"]'));
    archLinks.forEach((link) => {
      link.addEventListener("click", () => {
        accordion.open = true;
        syncHint();
      });
    });
  }

  function initCopyButtons() {
    const buttons = Array.from(document.querySelectorAll("[data-copy-target]"));
    buttons.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const targetId = btn.getAttribute("data-copy-target");
        const target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        try {
          await navigator.clipboard.writeText(target.textContent || "");
          const original = btn.textContent;
          btn.textContent = "已複製 ✓";
          setTimeout(() => {
            btn.textContent = original;
          }, 1600);
        } catch {
          btn.textContent = "請手動選取複製";
        }
      });
    });
  }

  function initReadingProgress() {
    const bar = document.getElementById("reading-progress");
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      bar.style.width = `${percent}%`;
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFiltering();
    initQuickSpecs();
    initAccordion();
    initCopyButtons();
    initReadingProgress();
  });
})();
