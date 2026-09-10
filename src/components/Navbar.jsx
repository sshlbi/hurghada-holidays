import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { t, lang, setLang, currency, setCurrency } = useApp();

  return (
    <header
      className="relative z-20 flex flex-wrap items-center justify-between gap-3 h-[72px] max-[640px]:h-auto max-[640px]:py-2.5 px-5 max-[640px]:px-3.5 border-b border-white/10 backdrop-blur-sm -mt-1"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(6, 22, 32, 0.25) 0%, rgba(6, 22, 32, 0.18) 25%, rgba(6, 22, 32, 0.18) 75%, rgba(6, 22, 32, 0.25) 100%), url('/assets/images/hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <a
        href="#"
        className="flex items-center gap-2.5 font-display-brand font-display font-bold text-[1.2rem] max-[640px]:text-[1.05rem] text-white tracking-tight whitespace-nowrap flex-1 sm:flex-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-white/10 text-white shadow-soft border border-white/10">
          ◆
        </span>
        <span>{t("brand")}</span>
      </a>

      <div className="flex items-center gap-2 flex-wrap justify-end max-[640px]:w-full max-[640px]:justify-between">
        <div className="inline-flex border border-white/15 rounded-full overflow-hidden bg-white/8 backdrop-blur-sm max-[640px]:flex-1 max-[640px]:justify-center">
          {["en", "de", "ar"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`px-3 py-1.5 text-[0.78rem] max-[400px]:text-[0.66rem] font-semibold transition-colors ${
                lang === code ? "bg-white/80 text-slate-900" : "text-white/85 hover:bg-white/10"
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="inline-flex border border-white/15 rounded-full overflow-hidden bg-white/8 backdrop-blur-sm max-[640px]:flex-1 max-[640px]:justify-center">
          {["USD", "EUR", "EGP"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              className={`px-3 py-1.5 text-[0.78rem] max-[400px]:text-[0.66rem] font-semibold transition-colors ${
                currency === code ? "bg-white/80 text-slate-900" : "text-white/85 hover:bg-white/10"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 -bottom-px h-px bg-white/10" />
    </header>
  );
}
