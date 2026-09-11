import { ACTIVITIES } from "../../data/activities";
import { useApp } from "../../context/AppContext";
import WarnBanner from "./WarnBanner";

export default function StepActivities() {
  const { t, loc, money, selectedActivities, toggleActivity, skipActivities, nextStep } = useApp();

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
              className={`grid grid-cols-[auto_72px_1fr_auto] max-[560px]:grid-cols-[auto_56px_1fr] gap-x-3.5 gap-y-2.5 items-center rounded-2xl border-2 p-3.5 cursor-pointer transition-all duration-200 ${
                on ? "border-coral bg-coral/10" : "border-white/10 hover:border-coral/40 hover:bg-white/5"
              }`}
            >
              <input
                type="checkbox"
                checked={on}
                onChange={() => toggleActivity(a.id)}
                className="w-[18px] h-[18px] accent-coral cursor-pointer self-start mt-0.5"
              />
              <div className="w-[72px] h-[72px] max-[560px]:w-14 max-[560px]:h-14 rounded-[10px] overflow-hidden shrink-0 bg-white/5">
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
                <h4 className="text-[0.98rem] font-semibold text-white mb-1">{L.name}</h4>
                <p className="text-[0.84rem] text-lagoon/60 leading-snug">{L.desc}</p>
                <p className="text-[0.78rem] text-lagoon/40 mt-1">{t("priceUpdated")}</p>
              </div>
              <div className="whitespace-nowrap text-[0.95rem] font-mono font-semibold text-white flex items-center gap-1 justify-self-end self-center max-[560px]:col-span-3 max-[560px]:justify-self-stretch max-[560px]:justify-end max-[560px]:mt-1.5 max-[560px]:pt-2 max-[560px]:border-t max-[560px]:border-dashed max-[560px]:border-white/10">
                {money(a.price)}{" "}
                <span className="font-medium text-lagoon/50 text-[0.78rem]">{t("perPerson")}</span>
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
          className="rounded-full px-6 py-2.5 font-medium text-[0.92rem] text-white bg-white/10 backdrop-blur-md border border-white/25 shadow-glass transition-all duration-200 hover:bg-white/20 hover:border-white/40"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}