import { useApp } from "../../context/AppContext";

const STEP_KEYS = ["stepActivities", "stepHotel", "stepTransport", "stepInfo", "stepSummary", "stepConfirm"];

export default function WizardProgress() {
  const { t, step } = useApp();

  return (
    <div className="relative z-10 mb-7">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-glass border border-white/10 py-4 px-4 max-[480px]:px-2.5">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-3.5">
          <div
            className="h-full bg-gradient-to-r from-sea-light to-coral rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / 6) * 100}%` }}
          />
        </div>
        <div className="flex justify-between gap-1 overflow-x-auto [scrollbar-width:none]">
          {STEP_KEYS.map((key, i) => (
            <div key={key} className="flex-1 min-w-16 text-center text-[0.7rem] font-semibold text-lagoon/60">
              <div
                className={`w-7 h-7 rounded-full mx-auto mb-1.5 grid place-items-center text-[0.75rem] border-2 transition-all ${
                  i === step
                    ? "border-coral bg-coral text-white shadow-[0_4px_12px_rgba(200,79,48,0.35)]"
                    : i < step
                    ? "border-success bg-success text-white"
                    : "border-white/15 bg-white/5 text-lagoon/50"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={i === step ? "text-white" : ""}>{t(key)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}