import { ACTIVITIES } from "../../data/activities";
import { useApp } from "../../context/AppContext";
import WarnBanner from "./WarnBanner";

export default function StepActivities() {
  const { t, loc, money, selectedActivities, toggleActivity, skipActivities } = useApp();

  return (
    <div className="p-6 max-[480px]:p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass">
      <div className="flex justify-between items-center gap-3 mb-4">
        <p className="text-[0.78rem] text-lagoon/60">{t("activityHint")}</p>
        <button type="button" onClick={skipActivities} className="shrink-0 rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("skip")}
        </button>
      </div>
      <div className="grid gap-3">
        {ACTIVITIES.map((a) => {
          const L = loc(a);
          const on = selectedActivities.has(a.id);
          return (
            <label
              key={a.id}
              className={`relative rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-200 ${
                on ? "border-sea-light bg-sea-light/10" : "border-white/10 hover:border-sea-light/40 hover:bg-white/5"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggleActivity(a.id)}
                className="sr-only"
              />

              {/* ===== Mobile / Tablet layout (below md = 768px) ===== */}
              <div className="md:hidden">
                <div className="flex gap-3.5 items-start">
                  <div className="relative w-16 h-16 rounded-[10px] overflow-hidden shrink-0 bg-white/5">
                    <img
                      src={a.img}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <span
                      className={`absolute top-1 right-1 rtl:right-auto rtl:left-1 w-5 h-5 rounded-full grid place-items-center text-[0.65rem] border transition-colors ${
                        on ? "bg-sea-light border-sea-light text-white" : "bg-black/40 border-white/40 text-transparent"
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                  <h4 className="text-[0.94rem] font-semibold text-white leading-snug pt-1">{L.name}</h4>
                </div>

                <p className="text-[0.8rem] text-lagoon/60 leading-snug mt-2.5">{L.desc}</p>

                <div className="flex items-center justify-between gap-2 mt-2.5 pt-2.5 border-t border-white/10">
                  <span className="text-[0.72rem] text-lagoon/40">{t("priceUpdated")}</span>
                  <span className="whitespace-nowrap text-[0.9rem] font-mono font-semibold text-white">
                    {money(a.price)} <span className="font-medium text-lagoon/50 text-[0.72rem]">{t("perPerson")}</span>
                  </span>
                </div>
              </div>

              {/* ===== Desktop layout (md and up, unchanged) ===== */}
              <div className="hidden md:grid md:grid-cols-[72px_1fr_auto] md:items-center md:gap-3.5">
                <div className="relative w-[72px] h-[72px] rounded-[10px] overflow-hidden shrink-0 bg-white/5">
                  <img
                    src={a.img}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <span
                    className={`absolute top-1 right-1 rtl:right-auto rtl:left-1 w-5 h-5 rounded-full grid place-items-center text-[0.65rem] border transition-colors ${
                      on ? "bg-sea-light border-sea-light text-white" : "bg-black/40 border-white/40 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-[0.94rem] font-semibold text-white mb-1 leading-snug">{L.name}</h4>
                  <p className="text-[0.8rem] text-lagoon/60 leading-snug">{L.desc}</p>
                </div>

                <div className="flex flex-col items-end gap-1 whitespace-nowrap">
                  <span className="text-[0.95rem] font-mono font-semibold text-white">
                    {money(a.price)} <span className="font-medium text-lagoon/50 text-[0.78rem]">{t("perPerson")}</span>
                  </span>
                  <span className="text-[0.72rem] text-lagoon/40">{t("priceUpdated")}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      <WarnBanner step={0} />
    </div>
  );
}