/** Tiny language store (en | pt). Pure module so server code can import `copy` safely. */
export type Lang = "en" | "pt";

let lang: Lang = "en";
const listeners = new Set<() => void>();

export const getLang = () => lang;
export const subscribeLang = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export function setLang(next: Lang) {
  if (next === lang) return;
  lang = next;
  try {
    localStorage.setItem("lang", next);
    document.documentElement.lang = next;
  } catch {
    /* storage is optional */
  }
  listeners.forEach((l) => l());
}

/** First visit: Portuguese browsers get PT, everyone else EN. A saved choice always wins. */
export function initLang() {
  try {
    const saved = localStorage.getItem("lang");
    const pick: Lang = saved === "pt" || saved === "en" ? saved : (navigator.language || "").toLowerCase().startsWith("pt") ? "pt" : "en";
    setLang(pick);
  } catch {
    /* ignore */
  }
}
