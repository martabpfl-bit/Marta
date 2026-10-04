/* PT / EN switch: elements carry their Portuguese HTML in data-pt; English is the page source. */
(() => {
  const KEY = "ml-lang";
  const get = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const set = (v) => { try { localStorage.setItem(KEY, v); } catch {} };
  const apply = (lang) => {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-pt]").forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
      el.innerHTML = lang === "pt" ? el.dataset.pt : el.dataset.en;
    });
    document.querySelectorAll("[data-pt-label]").forEach((el) => {
      if (el.dataset.enLabel === undefined) el.dataset.enLabel = el.getAttribute("aria-label") || "";
      el.setAttribute("aria-label", lang === "pt" ? el.dataset.ptLabel : el.dataset.enLabel);
    });
    const t = document.querySelector("meta[name='title-pt']");
    if (t) { if (!document.documentElement.dataset.enTitle) document.documentElement.dataset.enTitle = document.title; document.title = lang === "pt" ? t.content : document.documentElement.dataset.enTitle; }
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    window.__lang = lang;
    document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
  };
  const start = get() || ((navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en");
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".lang button");
    if (!b) return;
    set(b.dataset.lang); apply(b.dataset.lang);
  });
  apply(start);
})();
