import { useApp } from "../../context/AppContext";

export default function StepConfirm() {
  const { t, refCode, resetWizard } = useApp();

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass text-center py-10 px-6">
      <div className="w-[72px] h-[72px] rounded-full mx-auto mb-[1.125rem] bg-success/15 text-success grid place-items-center text-3xl">✓</div>
      <h2 className="font-display font-semibold text-white mb-2.5 text-xl">{t("thanksTitle")}</h2>
      <p className="text-lagoon/60 max-w-[420px] mx-auto mb-5">{t("thanksBody")}</p>
      <p className="font-mono text-[0.9rem] text-sea-light mb-6">{refCode}</p>
      <button
        type="button"
        onClick={resetWizard}
        className="rounded-full px-6 py-2.5 font-medium text-[0.92rem] text-white bg-white/10 backdrop-blur-md border border-white/25 shadow-glass transition-all duration-200 hover:bg-white/20 hover:border-white/40"
      >
        {t("bookAnother")}
      </button>
    </div>
  );
}