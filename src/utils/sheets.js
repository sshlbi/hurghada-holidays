export const BOOKINGS_WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbxDicfSI9f_4611zhoW9Fbz59HXmt9sq8gdh-cDHJCbBpPbUK_XUIv0KIZ3dcuncnI/exec";

function isConfigured() {
  return BOOKINGS_WEBAPP_URL && BOOKINGS_WEBAPP_URL.indexOf("PASTE_YOUR") !== 0;
}

export function sendBookingToSheet(booking) {
  if (!isConfigured()) return Promise.resolve({ skipped: true });
  return fetch(BOOKINGS_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(booking),
  });
}

export function sendReviewToSheet(review) {
  if (!isConfigured()) return Promise.resolve({ skipped: true });
  return fetch(BOOKINGS_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type: "review", ...review }),
  });
}

export async function loadReviewsFromSheet() {
  if (!isConfigured()) return null;
  try {
    const res = await fetch(BOOKINGS_WEBAPP_URL + "?action=reviews");
    if (!res.ok) throw new Error("Reviews fetch failed: " + res.status);
    const data = await res.json();
    if (data && data.ok && Array.isArray(data.reviews) && data.reviews.length) {
      return data.reviews;
    }
    return null;
  } catch (err) {
    console.warn("Could not load shared reviews, showing local defaults:", err);
    return null;
  }
}
