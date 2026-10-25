import { Fragment, useState } from "react";
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
        <Fragment key={n}>
          <input
            type="radio"
            id={`star-${cat}-${n}`}
            name={`star-${cat}`}
            checked={value === n}
            onChange={() => onChange(n)}
          />
          <label htmlFor={`star-${cat}-${n}`} title={String(n)}>
            ★
          </label>
        </Fragment>
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
    <section className="relative py-16 px-5 text-sand overflow-hidden" id="reviews">
      <div className="max-w-[1100px] mx-auto relative">
        <div ref={headRef} className="reveal mb-7">
          <h2 className="font-display font-bold text-[clamp(1.5rem,2.6vw,2.1rem)] text-white mb-2 tracking-tight">
            {t("reviewsTitle")}
          </h2>
          <p className="max-w-[560px] text-lagoon/85">{t("reviewsSub")}</p>
          <div className="w-12 h-1 mt-3.5 rounded-full bg-gradient-to-r from-gold to-lagoon" />
        </div>

        <div className="grid grid-cols-[1fr_1.2fr] max-[860px]:grid-cols-1 gap-6">
          <div>
            <div ref={ratingsRef} className="reveal glass-soft p-5 mb-4">
              <h3 className="text-[1rem] mb-3.5 text-lagoon font-semibold">{t("avgRatings")}</h3>
              <div className="grid gap-3">
                {CATS.map((c) => {
                  const a = avgOf(reviews, c.key);
                  const rounded = Math.round(a);
                  return (
                    <div key={c.key} className="grid grid-cols-[1fr_auto] gap-2 items-center text-[0.9rem]">
                      <span>{t(c.label)}</span>
                      <span className="text-gold tracking-widest" title={a.toFixed(1)}>
                        {starsStr(rounded)}{" "}
                        <span className="text-lagoon/70 text-[0.8rem]">{reviews.length ? a.toFixed(1) : "—"}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="reveal glass p-5">
              <h3 className="text-[1rem] mb-3.5 text-lagoon font-semibold">{t("leaveReview")}</h3>
              <div className="mb-3">
                <label htmlFor="rv-name" className="text-[0.85rem] font-semibold text-white block mb-1.5">{t("yourName")}</label>
                <input id="rv-name" required maxLength={60} value={name} onChange={(e) => setName(e.target.value)} className="glass-input" />
              </div>
              {CATS.map((c) => (
                <div key={c.key} className="mb-3">
                  <span className="text-[0.85rem] font-semibold text-white block mb-1.5">{t(c.label)}</span>
                  <StarsInput
                    cat={c.key}
                    value={reviewStars[c.key]}
                    onChange={(n) => setReviewStars((s) => ({ ...s, [c.key]: n }))}
                  />
                </div>
              ))}
              <div className="mb-4">
                <label htmlFor="rv-text" className="text-[0.85rem] font-semibold text-white block mb-1.5">{t("reviewText")}</label>
                <textarea id="rv-text" required maxLength={600} rows={3} value={text} onChange={(e) => setText(e.target.value)} className="glass-input" />
              </div>
              <button type="submit" className="btn-primary">
                {t("postReview")}
              </button>
            </form>
          </div>

          <div className="max-h-[560px] overflow-y-auto flex flex-col gap-3 pe-1">
            {reviews.length === 0 && <div className="glass-soft p-4 text-lagoon/80">{t("noReviews")}</div>}
            {reviews.map((r) => {
              const d = new Date(r.at).toLocaleDateString(localeTag);
              return (
                <article key={r.id} className="glass-soft glass-hover p-4">
                  <div className="flex justify-between gap-2.5 mb-2 flex-wrap">
                    <span className="font-bold text-white">{r.name}</span>
                    <span className="text-[0.78rem] text-lagoon/70">{d}</span>
                  </div>
                  <div className="text-[0.78rem] text-lagoon/70 mb-2">
                    {t("catOverall")}: <span className="text-gold tracking-widest">{starsStr(r.ratings.overall)}</span>
                    {" · "}
                    {t("catHotel")} {r.ratings.hotel} · {t("catActivities")} {r.ratings.activities} · {t("catTransport")} {r.ratings.transport}
                  </div>
                  <p className="text-[0.92rem] text-sand/90">{r.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}