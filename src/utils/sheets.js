export const BOOKINGS_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbxDicfSI9f_4611zhoW9Fbz59HXmt9sq8gdh-cDHJCbBpPbUK_XUIv0KIZ3dcuncnI/exec";
export const COMPANY_EMAIL = "hurghadaholidays434@gmail.com";

function isConfigured() {
  return BOOKINGS_WEBAPP_URL && BOOKINGS_WEBAPP_URL.indexOf("PASTE_YOUR") !== 0;
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    mode: "cors",
    cache: "no-store",
    credentials: "omit",
    ...options,
  });

  const text = await res.text();
  if (!text) return { ok: res.ok };

  try {
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error((data && data.error) || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    if (!res.ok) throw err;
    return { ok: true, raw: text };
  }
}

export function sendBookingToSheet(booking) {
  if (!isConfigured()) return Promise.resolve({ skipped: true, reason: "not_configured" });

  return fetchJson(BOOKINGS_WEBAPP_URL + "?action=booking", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "booking", ...booking }),
  });
}

export function sendReviewToSheet(review) {
  if (!isConfigured()) return Promise.resolve({ skipped: true, reason: "not_configured" });

  return fetchJson(BOOKINGS_WEBAPP_URL + "?action=review", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "review", ...review }),
  });
}

export async function loadReviewsFromSheet() {
  if (!isConfigured()) return null;
  try {
    const data = await fetchJson(BOOKINGS_WEBAPP_URL + "?action=reviews", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (data && data.ok && Array.isArray(data.reviews) && data.reviews.length) {
      return data.reviews;
    }
    return null;
  } catch (err) {
    console.warn("Could not load shared reviews, showing local defaults:", err);
    return null;
  }
}
