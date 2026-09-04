import { ACTIVITIES } from "../../data/activities";
import { useApp } from "../../context/AppContext";
import WarnBanner from "./WarnBanner";

export default function StepActivities() {
  const { t, loc, money, selectedActivities, toggleActivity, skipActivities, nextStep } = useApp();
 
  return (
    <div className="p-6 max-[480px]:p-4 bg-surface rounded-2xl border border-border shadow-soft">
      <div className="flex justify-between items-center gap-3 mb-4">
        <p className="text-[0.78rem] text-muted">{t("activityHint")}</p>
        <button type="button" onClick={skipActivities} className="shrink-0 rounded-full border border-border px-4 py-2 font-semibold text-[0.85rem] text-deep">
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
              className={`grid grid-cols-[auto_72px_1fr_auto] max-[560px]:grid-cols-[auto_56px_1fr] gap-x-3.5 gap-y-2.5 items-center rounded-2xl border-2 p-3.5 cursor-pointer transition-all ${
                on ? "border-sea bg-sea/5" : "border-border hover:border-sea-light hover:shadow-soft"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggleActivity(a.id)}
                className="w-[18px] h-[18px] accent-sea cursor-pointer self-start mt-0.5"
              />
              <div className="w-[72px] h-[72px] max-[560px]:w-14 max-[560px]:h-14 rounded-[10px] overflow-hidden shrink-0 bg-surface-2">
                <img
                  src={a.img}
                  alt=""
                  loading="lazy"
                  width="72"
                  height="72"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-[0.98rem] font-semibold text-deep mb-1">{L.name}</h4>
                <p className="text-[0.84rem] text-muted leading-snug">{L.desc}</p>
                <p className="text-[0.78rem] text-muted mt-1">{t("priceUpdated")}</p>
              </div>
              <div className="whitespace-nowrap text-[0.95rem] font-mono font-semibold text-deep flex items-center gap-1 justify-self-end self-center max-[560px]:col-span-3 max-[560px]:justify-self-stretch max-[560px]:justify-end max-[560px]:mt-1.5 max-[560px]:pt-2 max-[560px]:border-t max-[560px]:border-dashed max-[560px]:border-border">
                {money(a.price)}{" "}
                <span className="font-medium text-muted text-[0.78rem]">{t("perPerson")}</span>
              </div>
            </label>
          );
        })}
      </div>
      <WarnBanner step={0} />
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