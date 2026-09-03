export const FX_FALLBACK = { USD: 1, EUR: 0.92, EGP: 48.5 };
const FX_CACHE_KEY = "hh_fx_rates_v2";
const FX_CACHE_MS = 6 * 60 * 60 * 1000;

async function fetchFxFrom(url, parseFn) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("FX fetch failed (" + url + "): " + res.status);
  const data = await res.json();
  const rates = parseFn(data);
  if (!rates || typeof rates.EUR !== "number" || typeof rates.EGP !== "number") {
    throw new Error("FX response missing EUR/EGP rates from " + url);
  }
  return rates;
}

export async function loadFxRates() {
  try {
    const cachedRaw = localStorage.getItem(FX_CACHE_KEY);
    const cached = cachedRaw ? JSON.parse(cachedRaw) : null;
    if (cached && cached.rates && Date.now() - cached.at < FX_CACHE_MS) {
      return { rates: cached.rates, live: true };
    }

    let rates = null;
    try {
      rates = await fetchFxFrom(
        "https://open.er-api.com/v6/latest/USD",
        (data) =>
          data && data.result === "success" && data.rates
            ? { USD: 1, EUR: data.rates.EUR, EGP: data.rates.EGP }
            : null
      );
    } catch (err1) {
      console.warn("Primary FX source failed, trying backup:", err1);
      rates = await fetchFxFrom(
        "https://api.exchangerate-api.com/v4/latest/USD",
        (data) =>
          data && data.rates ? { USD: 1, EUR: data.rates.EUR, EGP: data.rates.EGP } : null
      );
    }

    localStorage.setItem(FX_CACHE_KEY, JSON.stringify({ rates, at: Date.now() }));
    return { rates, live: true };
  } catch (err) {
    console.warn("Live FX rates unavailable from all sources, using fallback:", err);
    return { rates: { ...FX_FALLBACK }, live: false };
  }
}
