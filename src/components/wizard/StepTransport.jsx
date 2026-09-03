import { TRANSPORT } from "../../data/transport";
import { useApp } from "../../context/AppContext";
import WarnBanner from "./WarnBanner";

export default function StepTransport() {
  const { t, loc, money, selectedTransport, toggleTransport, skipTransport, nextStep, prevStep } = useApp();

  return (
    <div className="p-6 max-[480px]:p-4 bg-surface rounded-2xl border border-border shadow-soft">
      <p className="text-[0.78rem] text-muted mb-3.5">{t("transportHint")}</p>
      <div className="grid gap-3">
        {TRANSPORT.map((tr) => {
          const L = loc(tr);
          const on = selectedTransport.has(tr.id);
          return (
            <label
              key={tr.id}
              className={`grid grid-cols-[auto_1fr_auto] gap-x-3.5 gap-y-2.5 items-center rounded-2xl border-2 p-3.5 cursor-pointer transition-all ${
                on ? "border-sea bg-sea/5" : "border-border hover:border-sea-light hover:shadow-soft"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggleTransport(tr.id)}
                className="w-[18px] h-[18px] accent-sea cursor-pointer self-start mt-0.5"
              />
              <div className="min-w-0">
                <h4 className="text-[0.98rem] font-semibold text-deep mb-1">{L.name}</h4>
                <p className="text-[0.84rem] text-muted leading-snug">{L.desc}</p>
                <p className="text-[0.78rem] text-muted mt-1">{t("priceUpdated")}</p>
              </div>
              <div className="whitespace-nowrap text-[0.95rem] font-mono font-semibold text-deep flex items-center gap-1 justify-self-end self-center">
                {money(tr.price)}{" "}
                <span className="font-medium text-muted text-[0.78rem]">{t("perTrip")}</span>
              </div>
            </label>
          );
        })}
      </div>
      <WarnBanner step={2} />
      <div className="flex justify-between gap-3 mt-7 flex-wrap">
        <button type="button" onClick={prevStep} className="rounded-full bg-surface border border-border px-5 py-2.5 font-semibold text-[0.95rem] text-deep shadow-soft">
          {t("back")}
        </button>
        <div className="flex gap-2.5 flex-wrap">
          <button type="button" onClick={skipTransport} className="rounded-full border border-border px-5 py-2.5 font-semibold text-[0.95rem] text-deep">
            {t("skip")}
          </button>
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
    </div>
  );
}
