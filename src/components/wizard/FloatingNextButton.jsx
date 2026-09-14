import { useApp } from "../../context/AppContext";

export default function FloatingNextButton() {
  const { t, bookingStarted, step, hasSelectionForStep, nextStep } = useApp();

  if (!bookingStarted) return null;
  if (step > 2) return null;
  if (!hasSelectionForStep(step)) return null;

  return (
    <button
      type="button"
      onClick={() => nextStep()}
      className="fixed bottom-24 right-6 rtl:left-6 rtl:right-auto z-[190] rounded-full px-6 py-3 font-medium text-[0.92rem] text-white bg-white/10 backdrop-blur-md border border-white/25 shadow-glass transition-all duration-200 hover:bg-white/20 hover:border-white/40 animate-fadeUp"
    >
      {t("next")} <span className="rtl:rotate-180">→</span>
    </button>
  );
}