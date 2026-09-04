import { HOTELS } from "../../data/hotels";
import { useApp } from "../../context/AppContext";
import WarnBanner from "./WarnBanner";

const FILTERS = [
  { id: "all", key: "filterAll" },
  { id: "5", key: "filter5" },
  { id: "4", key: "filter4" },
  { id: "3", key: "filter3" },
];

export default function StepHotels() {
  const { t, loc, money, hotelFilter, setHotelFilter, selectedHotel, chooseHotel, skipHotel, nextStep, prevStep } = useApp();

  const list = HOTELS.filter((h) => hotelFilter === "all" || String(h.stars) === hotelFilter);

  return (
    <div className="p-6 max-[480px]:p-4 bg-surface rounded-2xl border border-border shadow-soft">
      <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
        <button type="button" onClick={prevStep} className="rounded-full bg-surface border border-border px-4 py-2 font-semibold text-[0.85rem] text-deep">
          {t("back")}
        </button>
        <button type="button" onClick={skipHotel} className="rounded-full border border-border px-4 py-2 font-semibold text-[0.85rem] text-deep">
          {t("skip")}
        </button>
      </div>
      <p className="text-[0.78rem] text-muted mb-3.5">{t("hotelPriceNotice")}</p>

      <div className="flex flex-wrap gap-2 mb-[1.125rem]">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setHotelFilter(f.id)}
            className={`rounded-full px-4 py-2 text-[0.82rem] font-semibold border transition-colors ${
              hotelFilter === f.id ? "bg-deep text-white border-deep" : "border-border text-muted hover:bg-deep hover:text-white hover:border-deep"
            }`}
          >
            {t(f.key)}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface-soft p-5 text-center">
          <p className="font-semibold text-deep mb-2">{t("noHotelsFound")}</p>
          <p className="text-[0.86rem] text-muted mb-4">{t("noHotelsFoundHint")}</p>
          <button
            type="button"
            onClick={() => setHotelFilter("all")}
            className="rounded-full border border-border px-4 py-2 text-[0.82rem] font-semibold text-deep"
          >
            {t("showAllHotels")}
          </button>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {list.map((h) => {
            const L = loc(h);
            const sel = selectedHotel === h.id;
            const handleKeyDown = (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                chooseHotel(h.id);
              }
            };

            return (
              <article
                key={h.id}
                role="button"
                tabIndex={0}
                aria-pressed={sel}
                onClick={() => chooseHotel(h.id)}
                onKeyDown={handleKeyDown}
                className={`relative flex flex-col overflow-hidden bg-surface rounded-2xl border-2 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-coral/70 ${
                  sel
                    ? "border-coral shadow-[0_0_0_3px_rgba(226,96,61,0.22)] -translate-y-0.5"
                    : "border-border hover:border-sea-light hover:shadow-lifted hover:-translate-y-1"
                }`}
              >
                {sel && (
                  <span className="absolute top-0 left-0 right-0 h-1 z-[3]" style={{ background: "linear-gradient(90deg, #D3A34C, #E2603D)" }} />
                )}
                <span
                  className={`absolute top-3 right-3 rtl:left-3 rtl:right-auto z-[2] w-7 h-7 rounded-full bg-coral text-white grid place-items-center text-[0.9rem] shadow-[0_4px_12px_rgba(200,79,48,0.45)] ${
                    sel ? "grid" : "hidden"
                  }`}
                >
                  ✓
                </span>
                <div className="relative h-[168px] overflow-hidden bg-gradient-to-br from-deep to-sea">
                  <img
                    src={h.img}
                    alt=""
                    loading="lazy"
                    width="600"
                    height="168"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/45 pointer-events-none" style={{ backgroundImage: "linear-gradient(180deg, transparent 40%, rgba(18,37,49,0.45))" }} />
                </div>
                <div className="flex flex-col gap-2 p-[1.125rem] flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-gold text-[0.82rem] tracking-widest">{"★".repeat(h.stars)}</div>
                    {sel && (
                      <span className="rounded-full bg-deep text-white px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.08em]">
                        {t("selected")}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-[1.08rem] text-deep leading-snug">{L.name}</h3>
                  <p className="text-[0.88rem] text-muted leading-relaxed flex-1">{L.desc}</p>
                  <p className="text-[0.78rem] text-muted">{t("priceUpdated")}</p>
                  <div className="flex items-center justify-between gap-2.5 flex-wrap mt-1.5 pt-3 border-t border-border">
                    <div>
                      <span className="font-mono font-semibold text-deep">{money(h.price)}</span>{" "}
                      <span className="text-[0.8rem] text-muted">{t("approxPerNight")}</span>
                    </div>
                    <span
                      className={`inline-flex items-center rounded-full px-3.5 py-2 text-[0.85rem] font-semibold ${
                        sel ? "text-white" : "border border-border text-deep"
                      }`}
                      style={sel ? { background: "linear-gradient(145deg, #D3A34C -10%, #E2603D 55%, #C94F30 100%)" } : undefined}
                    >
                      {sel ? t("selected") : t("select")}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <WarnBanner step={1} />
      <div className="flex justify-end mt-7">
        <button
          type="button"
          onClick={() => nextStep()}
          className="rounded-full px-6 py-2.5 font-semibold text-[0.95rem] text-white shadow-soft"
          style={{ background: "linear-gradient(145deg, #D3A34C -10%, #E2603D 55%, #C94F30 100%)" }}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}