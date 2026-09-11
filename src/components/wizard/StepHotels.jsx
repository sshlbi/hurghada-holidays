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
    <div className="p-6 max-[480px]:p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass">
      <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
        <button type="button" onClick={prevStep} className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("back")}
        </button>
        <button type="button" onClick={skipHotel} className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("skip")}
        </button>
      </div>
      <p className="text-[0.78rem] text-lagoon/60 mb-3.5">{t("hotelPriceNotice")}</p>

      <div className="flex flex-wrap gap-2 mb-[1.125rem]">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setHotelFilter(f.id)}
            className={`rounded-full px-4 py-2 text-[0.82rem] font-semibold border backdrop-blur-md transition-all duration-200 ${
              hotelFilter === f.id ? "bg-white/15 text-white border-white/30" : "bg-white/5 border-white/10 text-lagoon/60 hover:bg-white/10 hover:text-white hover:border-white/25"
            }`}
          >
            {t(f.key)}
          </button>
        ))}
      </div>

      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {list.map((h) => {
          const L = loc(h);
          const sel = selectedHotel === h.id;
          return (
            <article
              key={h.id}
              onClick={() => chooseHotel(h.id)}
              className={`relative flex flex-col overflow-hidden bg-white/5 backdrop-blur-md rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                sel
                  ? "border-coral shadow-[0_0_0_3px_rgba(226,96,61,0.22)] -translate-y-0.5"
                  : "border-white/10 hover:border-sea-light hover:shadow-lifted hover:-translate-y-1"
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
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "assets/images/resort-1.jpg";
                  }}
                />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(180deg, transparent 40%, rgba(6,22,32,0.6))" }} />
              </div>
              <div className="flex flex-col gap-2 p-[1.125rem] flex-1">
                <div className="text-gold text-[0.82rem] tracking-widest">{"★".repeat(h.stars)}</div>
                <h3 className="font-display font-semibold text-[1.08rem] text-white leading-snug">{L.name}</h3>
                <p className="text-[0.88rem] text-lagoon/60 leading-relaxed flex-1">{L.desc}</p>
                <p className="text-[0.78rem] text-lagoon/40">{t("priceUpdated")}</p>
                <div className="flex items-center justify-between gap-2.5 flex-wrap mt-1.5 pt-3 border-t border-white/10">
                  <div>
                    <span className="font-mono font-semibold text-white">{money(h.price)}</span>{" "}
                    <span className="text-[0.8rem] text-lagoon/50">{t("approxPerNight")}</span>
                  </div>
                  <button
                    type="button"
                    className={`rounded-full px-3.5 py-2 text-[0.85rem] font-medium backdrop-blur-md border transition-all duration-200 ${
                      sel ? "text-white bg-coral/80 border-coral/60" : "bg-white/5 border-white/15 text-sand hover:border-white/30"
                    }`}
                  >
                    {sel ? t("selected") : t("select")}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <WarnBanner step={1} />
      <div className="flex justify-end mt-7">
        <button
          type="button"
          onClick={() => nextStep()}
          className="rounded-full px-6 py-2.5 font-medium text-[0.92rem] text-white bg-white/10 backdrop-blur-md border border-white/25 shadow-glass transition-all duration-200 hover:bg-white/20 hover:border-white/40"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}