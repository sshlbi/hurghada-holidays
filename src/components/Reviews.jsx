import { useState } from "react";
import { useApp } from "../context/AppContext";
import { starsStr } from "../utils/format";
import { useReveal } from "../utils/useReveal";

const CATS = [
  { key: "hotel", label: "catHotel" },
  { key: "activities", label: "catActivities" },
  { key: "transport", label: "catTransport" },
  { key: "overall", label: "catOverall" },
];

function avgOf(reviews, key) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + (r.ratings[key] || 0), 0) / reviews.length;
}

function StarsInput({ cat, value, onChange }) {
  return (
    <div className="stars-input flex gap-1 flex-row-reverse justify-end rtl:justify-start">
      {[5, 4, 3, 2, 1].map((n) => (
        <label key={n} title={String(n)}>
          <input type="radio" name={`star-${cat}`} checked={value === n} onChange={() => onChange(n)} />★
        </label>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t, lang, reviews, reviewStars, setReviewStars, submitReview } = useApp();
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const headRef = useReveal();
  const ratingsRef = useReveal();
  const formRef = useReveal();

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) return;
    submitReview(trimmedName, trimmedText);
    setName("");
    setText("");
  }

  const localeTag = lang === "ar" ? "ar-EG" : lang === "de" ? "de-DE" : "en-GB";

  return (
    <section className="relative py-14 px-5 bg-deep-2 text-sand overflow-hidden" id="reviews">
      <div className="absolute top-0 left-0 right-0 h-[60px] overflow-hidden leading-none -translate-y-px" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-full block">
          <path
            d="M0,32 C240,80 480,0 720,28 C960,56 1200,8 1440,40 L1440,0 L0,0 Z"
            fill="#061620"
          />
        </svg>
      </div>

      <div className="max-w-[1100px] mx-auto relative">
        <div ref={headRef} className="reveal mb-7">
          <h2 className="font-display font-semibold text-[clamp(1.65rem,3vw,2.2rem)] text-white mb-2 tracking-tight">
            {t("reviewsTitle")}
          </h2>
          <p className="max-w-[560px] text-lagoon/80">{t("reviewsSub")}</p>
        </div>

        <div className="grid grid-cols-[1fr_1.2fr] max-[860px]:grid-cols-1 gap-6">
          <div>
            <div ref={ratingsRef} className="reveal bg-[#152F3E] border border-white/10 rounded-2xl p-5 mb-4">
              <h3 className="text-[1rem] mb-3.5 text-sea-light font-semibold">{t("avgRatings")}</h3>
              <div className="grid gap-3">
                {CATS.map((c) => {
                  const a = avgOf(reviews, c.key);
                  const rounded = Math.round(a);
                  return (
                    <div key={c.key} className="grid grid-cols-[1fr_auto] gap-2 items-center text-[0.9rem]">
                      <span>{t(c.label)}</span>
                      <span className="text-warn tracking-widest" title={a.toFixed(1)}>
                        {starsStr(rounded)}{" "}
                        <span className="text-lagoon/70 text-[0.8rem]">{reviews.length ? a.toFixed(1) : "—"}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="reveal bg-[#152F3E] border border-white/10 rounded-2xl p-5">
              <h3 className="text-[1rem] mb-3.5 text-sea-light font-semibold">{t("leaveReview")}</h3>
              <div className="mb-3">
                <label className="text-[0.85rem] font-semibold text-white block mb-1.5">{t("yourName")}</label>
                <input
                  required
                  maxLength={60}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#0F2635] text-white px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sea/40"
                />
              </div>
              {CATS.map((c) => (
                <div key={c.key} className="mb-3">
                  <label className="text-[0.85rem] font-semibold text-white block mb-1.5">{t(c.label)}</label>
                  <StarsInput
                    cat={c.key}
                    value={reviewStars[c.key]}
                    onChange={(n) => setReviewStars((s) => ({ ...s, [c.key]: n }))}
                  />
                </div>
              ))}
              <div className="mb-3">
                <label className="text-[0.85rem] font-semibold text-white block mb-1.5">{t("reviewText")}</label>
                <textarea
                  required
                  maxLength={600}
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-[#0F2635] text-white px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-sea/40"
                />
              </div>
              <button
                type="submit"
                className="rounded-full px-6 py-2.5 font-semibold text-[0.95rem] text-white shadow-soft"
                style={{ background: "linear-gradient(145deg, #D3A34C -10%, #E2603D 55%, #C94F30 100%)" }}
              >
                {t("postReview")}
              </button>
            </form>
          </div>

          <div className="max-h-[480px] overflow-y-auto flex flex-col gap-3 pe-1">
            {reviews.length === 0 && (
              <div className="bg-[#152F3E] border border-white/10 rounded-2xl p-4 text-lagoon/70">{t("noReviews")}</div>
            )}
            {reviews.map((r) => {
              const d = new Date(r.at).toLocaleDateString(localeTag);
              return (
                <article key={r.id} className="bg-[#152F3E] border border-white/10 rounded-2xl p-4">
                  <div className="flex justify-between gap-2.5 mb-2 flex-wrap">
                    <span className="font-bold text-white">{r.name}</span>
                    <span className="text-[0.78rem] text-lagoon/70">{d}</span>
                  </div>
                  <div className="text-[0.78rem] text-lagoon/70 mb-2">
                    {t("catOverall")}: <span className="text-warn tracking-widest">{starsStr(r.ratings.overall)}</span>
                    {" · "}
                    {t("catHotel")} {r.ratings.hotel} · {t("catActivities")} {r.ratings.activities} · {t("catTransport")} {r.ratings.transport}
                  </div>
                  <p className="text-[0.92rem] text-lagoon/90">{r.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}