import { TRANSPORT } from "../../data/transport";
import { useApp } from "../../context/AppContext";
import WarnBanner from "./WarnBanner";

export default function StepTransport() {
  const { t, loc, money, selectedTransport, toggleTransport, skipTransport, prevStep } = useApp();

  return (
    <div className="p-6 max-[480px]:p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass">
      <div className="flex justify-between items-center gap-3 mb-4 flex-wrap">
        <button type="button" onClick={prevStep} className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("back")}
        </button>
        <button type="button" onClick={skipTransport} className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("skip")}
        </button>
      </div>
      <p className="text-[0.78rem] text-lagoon/60 mb-3.5">{t("transportHint")}</p>
      <div className="grid gap-3">
        {TRANSPORT.map((tr) => {
          const L = loc(tr);
          const on = selectedTransport.has(tr.id);
          return (
            <label
              key={tr.id}
              className={`rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-200 ${
                on ? "border-sea-light bg-sea-light/10" : "border-white/10 hover:border-sea-light/40 hover:bg-white/5"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggleTransport(tr.id)}
                className="sr-only"
              />

              {/* ===== Mobile / Tablet layout (below md = 768px) ===== */}
              <div className="md:hidden">
                <div className="flex gap-3 items-start">
                  <span
                    className={`shrink-0 mt-0.5 w-[18px] h-[18px] rounded-[5px] border-2 grid place-items-center text-[0.65rem] transition-colors ${
                      on ? "bg-sea-light border-sea-light text-white" : "border-white/40 text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <h4 className="text-[0.98rem] font-semibold text-white leading-snug flex-1 min-w-0">{L.name}</h4>
                </div>

                <p className="text-[0.84rem] text-lagoon/60 leading-snug mt-2.5">{L.desc}</p>

                <div className="mt-2.5 pt-2.5 border-t border-white/10">
                  <p className="text-[0.78rem] text-lagoon/40 leading-snug line-clamp-2">{t("priceUpdated")}</p>
                  <div className="flex justify-end mt-1.5">
                    <span className="whitespace-nowrap text-[0.95rem] font-mono font-semibold text-white flex items-center gap-1">
                      {money(tr.price)}{" "}
                      <span className="font-medium text-lagoon/50 text-[0.78rem]">{t("perTrip")}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ===== Desktop layout (md and up, unchanged) ===== */}
              <div className="hidden md:grid md:grid-cols-[auto_1fr_auto] md:gap-x-3.5 md:gap-y-2.5 md:items-center">
                <span
                  className={`w-[18px] h-[18px] rounded-[5px] border-2 grid place-items-center text-[0.65rem] self-start mt-0.5 transition-colors ${
                    on ? "bg-sea-light border-sea-light text-white" : "border-white/40 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <div className="min-w-0">
                  <h4 className="text-[0.98rem] font-semibold text-white mb-1">{L.name}</h4>
                  <p className="text-[0.84rem] text-lagoon/60 leading-snug">{L.desc}</p>
                  <p className="text-[0.78rem] text-lagoon/40 mt-1">{t("priceUpdated")}</p>
                </div>
                <div className="whitespace-nowrap text-[0.95rem] font-mono font-semibold text-white flex items-center gap-1 justify-self-end self-center">
                  {money(tr.price)}{" "}
                  <span className="font-medium text-lagoon/50 text-[0.78rem]">{t("perTrip")}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
      <WarnBanner step={2} />
    </div>
  );
}