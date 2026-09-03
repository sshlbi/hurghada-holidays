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
        <div ref={headRef} className="reveal relative mb-7">
          <span
            className="absolute -top-1.5 -left-1.5 rtl:-right-1.5 rtl:left-auto text-[2.6rem] font-display text-sea opacity-15 tracking-widest pointer-events-none animate-sway"
            aria-hidden="true"
          >
            ∿∿∿
          </span>
          <h2 className="relative z-10 font-display font-semibold text-[clamp(1.65rem,3vw,2.2rem)] text-sand mb-2 tracking-tight">
            {t("teaserTitle")}
          </h2>
          <p className="max-w-[560px] text-lagoon/90">{t("teaserSub")}</p>
          <div
            className="w-14 h-1.5 mt-3.5 rounded-sm"
            style={{ background: "repeating-linear-gradient(115deg, #E2603D 0 5px, #1C7C93 5px 10px)" }}
          />
        </div>

        <div ref={gridRef} className="reveal grid gap-[1.125rem] grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {items.map((a) => {
            const L = loc(a);
            return (
              <article
                key={a.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all hover:shadow-lifted hover:-translate-y-1"
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
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-[0.95rem] text-white shadow-[0_8px_24px_rgba(200,79,48,0.38)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ background: "linear-gradient(145deg, #D3A34C -10%, #E2603D 55%, #C94F30 100%)" }}
          >
            {t("ctaStartBooking")}
            <span className="font-bold rtl:rotate-180">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
