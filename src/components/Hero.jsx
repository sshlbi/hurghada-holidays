import { useApp } from "../context/AppContext";

export default function Hero() {
  const { t, startBooking } = useApp();

  return (
    <section
      className="relative min-h-[min(72vh,560px)] flex items-center justify-center text-center text-white px-5 pt-20 pb-32 max-[640px]:pb-16 overflow-hidden isolate hero-clip"
      style={{
        backgroundImage:
          "linear-gradient(165deg, rgba(18,37,49,0.8) 0%, rgba(11,48,73,0.62) 45%, rgba(211,163,76,0.4) 100%), url(assets/images/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_100%,rgba(211,163,76,0.22),transparent_55%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none hero-caustic origin-[80%_20%] bg-[radial-gradient(circle_at_80%_20%,rgba(211,163,76,0.2),transparent_40%)]" />

      <div className="relative z-10 max-w-[760px]">
        <span className="inline-block px-[1.125rem] py-2 rounded-full bg-white/10 border border-gold/60 backdrop-blur-md text-[0.78rem] tracking-[0.16em] uppercase font-bold text-gold mb-5 shadow-[0_0_0_3px_rgba(28,124,147,0.28)]">
          {t("heroBadge")}
        </span>
        <h1 className="font-display font-semibold text-[clamp(2.15rem,5.5vw,3.5rem)] leading-[1.12] mb-4 tracking-tight [text-shadow:0_4px_32px_rgba(18,37,49,0.55)]">
          {t("heroTitle")}
        </h1>
        <p className="text-[clamp(1.02rem,2vw,1.2rem)] opacity-95 max-w-[560px] mx-auto mb-8 leading-relaxed [text-shadow:0_1px_12px_rgba(18,37,49,0.4)]">
          {t("heroSub")}
        </p>
        <button
          type="button"
          onClick={startBooking}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-[0.95rem] text-white shadow-[0_8px_24px_rgba(200,79,48,0.38)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(200,79,48,0.48)] active:scale-[0.98]"
          style={{ background: "linear-gradient(145deg, #D3A34C -10%, #E2603D 55%, #C94F30 100%)" }}
        >
          {t("ctaBook")}
          <span className="font-bold rtl:rotate-180">→</span>
        </button>
        <div className="flex flex-wrap gap-x-[1.125rem] gap-y-2.5 justify-center mt-7 text-[0.82rem] opacity-90 font-medium">
          {["trustLocal", "trustLang", "trustConfirm"].map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20">
              {t(k)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
