import { ACTIVITIES, TEASER_ACTIVITY_IDS } from "../data/activities";
import { useApp } from "../context/AppContext";
import { useReveal } from "../utils/useReveal";

export default function Teaser() {
  const { t, loc, money, startBooking } = useApp();
  const headRef = useReveal();
  const gridRef = useReveal();

  const items = TEASER_ACTIVITY_IDS.map((id) => ACTIVITIES.find((a) => a.id === id)).filter(Boolean);

  return (
    <section className="py-14 px-5">
      <div className="max-w-[1100px] mx-auto">
        <div ref={headRef} className="reveal mb-7">
          <h2 className="font-display font-medium text-[clamp(1.5rem,2.6vw,2rem)] text-sand mb-2 tracking-tight">
            {t("teaserTitle")}
          </h2>
          <p className="max-w-[560px] text-lagoon/80">{t("teaserSub")}</p>
          <div className="w-10 h-0.5 mt-3.5 rounded-sm bg-coral/70" />
        </div>

        <div ref={gridRef} className="reveal grid gap-[1.125rem] grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {items.map((a) => {
            const L = loc(a);
            return (
              <article
                key={a.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-200 hover:shadow-lifted hover:-translate-y-1"
              >
                <div className="relative h-[140px] overflow-hidden bg-gradient-to-br from-deep to-sea">
                  <img
                    src={a.img}
                    alt=""
                    loading="lazy"
                    width="400"
                    height="140"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 p-4">
                  <h4 className="font-display font-semibold text-[0.96rem] text-deep leading-snug">{L.name}</h4>
                  <p className="text-[0.82rem] text-muted leading-relaxed flex-1">{L.desc}</p>
                  <div className="flex items-center justify-between mt-1 pt-2.5 border-t border-border">
                    <span className="font-mono font-semibold text-deep tabular-nums">
                      {money(a.price)}{" "}
                      <span className="font-medium text-muted text-[0.76rem]">{t("perPerson")}</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-7">
          <button
            type="button"
            onClick={startBooking}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-medium text-[0.92rem] text-white bg-coral transition-colors duration-200 hover:bg-coral-hover"
          >
            {t("ctaStartBooking")}
            <span className="rtl:rotate-180">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}