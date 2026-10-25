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
          <h2 className="font-display font-bold text-[clamp(1.5rem,2.6vw,2.1rem)] text-white mb-2 tracking-tight">
            {t("teaserTitle")}
          </h2>
          <p className="max-w-[560px] text-lagoon/85">{t("teaserSub")}</p>
          <div className="w-12 h-1 mt-3.5 rounded-full bg-gradient-to-r from-gold to-lagoon" />
        </div>

        <div ref={gridRef} className="reveal grid gap-[1.125rem] grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {items.map((a) => {
            const L = loc(a);
            return (
              <article key={a.id} className="glass-soft glass-hover flex flex-col overflow-hidden">
                <div className="relative h-[150px] overflow-hidden bg-gradient-to-br from-deep to-sea">
                  <img
                    src={a.img}
                    alt=""
                    loading="lazy"
                    width="400"
                    height="150"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(180deg, transparent 45%, rgba(6,40,61,0.7))" }} />
                  <span className="absolute bottom-2.5 left-2.5 rtl:left-auto rtl:right-2.5 glass !rounded-full px-3 py-1 text-[0.8rem] font-mono font-semibold text-white">
                    {money(a.price)} <span className="text-white/60 text-[0.7rem]">{t("perPerson")}</span>
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 p-4">
                  <h4 className="font-display font-semibold text-[0.98rem] text-white leading-snug">{L.name}</h4>
                  <p className="text-[0.82rem] text-lagoon/70 leading-relaxed flex-1">{L.desc}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button type="button" onClick={startBooking} className="btn-primary">
            {t("ctaStartBooking")}
            <span className="rtl:rotate-180">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}