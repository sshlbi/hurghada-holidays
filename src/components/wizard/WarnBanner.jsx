import { useApp } from "../../context/AppContext";

export default function WarnBanner({ step }) {
  const { t, warnStep } = useApp();
  if (warnStep !== step) return null;

  return (
    <div className="mt-3 mb-1 px-3.5 py-2.5 rounded-xl text-[0.84rem] font-semibold text-danger bg-danger/10 border border-danger/30 animate-fadeUp">
      {t("pleaseSelectOrSkip")}
    </div>
  );
}
