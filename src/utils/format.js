export function formatMoney(usd, currency, lang, fx) {
  const rate = fx[currency] || 1;
  const val = usd * rate;
  const sym = currency === "EUR" ? "€" : currency === "EGP" ? "E£" : "$";
  const n =
    currency === "EGP"
      ? Math.round(val).toLocaleString(lang === "de" ? "de-DE" : "en-US")
      : val.toLocaleString(lang === "de" ? "de-DE" : "en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
  return sym + n;
}

export function loc(item, lang) {
  return item[lang] || item.en;
}

export function starsStr(n) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));
}
