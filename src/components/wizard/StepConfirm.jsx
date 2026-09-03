import { useApp } from "../../context/AppContext";

export default function StepConfirm() {
  const { t, refCode, resetWizard } = useApp();

  return (
    <div className="bg-surface rounded-2xl border border-border shadow-soft text-center py-10 px-6">
      <div className="w-[72px] h-[72px] rounded-full mx-auto mb-[1.125rem] bg-success/15 text-success grid place-items-center text-3xl">✓</div>
      <h2 className="font-display font-semibold text-deep mb-2.5 text-xl">{t("thanksTitle")}</h2>
      <p className="text-muted max-w-[420px] mx-auto mb-5">{t("thanksBody")}</p>
      <p className="font-mono text-[0.9rem] text-sea mb-6">{refCode}</p>
      <button
        type="button"
        onClick={resetWizard}
        className="rounded-full px-6 py-2.5 font-semibold text-[0.95rem] text-white shadow-soft"
        style={{ background: "linear-gradient(145deg, #D3A34C -10%, #E2603D 55%, #C94F30 100%)" }}
      >
        {t("bookAnother")}
      </button>
    </div>
  );
}
