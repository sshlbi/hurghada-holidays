import { useApp } from "../context/AppContext";

export default function Hero() {
  const { t, startBooking } = useApp();

  return (
    <section
      className="relative min-h-[min(66vh,520px)] flex items-center justify-center text-center text-white px-5 pt-20 pb-20 overflow-hidden isolate"
      style={{
        backgroundImage:
          "linear-gradient(165deg, rgba(11,26,36,0.72) 0%, rgba(11,48,73,0.5) 55%, rgba(11,48,73,0.72) 100%), url(assets/images/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #061620)" }}
      />
      <div className="relative z-10 max-w-[720px]">
        <span className="inline-block px-5 py-2 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm text-[0.74rem] tracking-[0.14em] uppercase font-semibold text-gold/90 mb-6">
          {t("heroBadge")}
        </span>
        <h1 className="font-display font-medium text-[clamp(2rem,5vw,3.15rem)] leading-[1.15] mb-4 tracking-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-[clamp(1rem,1.8vw,1.15rem)] opacity-85 max-w-[520px] mx-auto mb-8 leading-relaxed font-light">
          {t("heroSub")}
        </p>
        <button
          type="button"
          onClick={startBooking}
          className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 font-medium text-[0.92rem] text-white bg-coral transition-colors hover:bg-coral-hover"
        >
          {t("ctaBook")}
          <span className="rtl:rotate-180">→</span>
        </button>
        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-8 text-[0.78rem] opacity-70 font-medium">
          {["trustLocal", "trustLang", "trustConfirm"].map((k) => (
            <span key={k}>{t(k)}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
