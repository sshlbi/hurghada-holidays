import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { t, lang, setLang, currency, setCurrency } = useApp();

  return (
    <header className="sticky top-0 relative z-20 flex flex-wrap items-center justify-between gap-3 h-[72px] max-[640px]:h-auto max-[640px]:py-2.5 px-5 max-[640px]:px-3.5 border-b border-white/10 bg-deep-2/50 backdrop-blur-xl">
      <a
        href="#"
        className="flex items-center gap-2.5 font-display-brand font-display font-bold text-[1.2rem] max-[640px]:text-[1.05rem] text-white tracking-tight whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src="Icon.png"
          alt="Hurghada Holidays logo"
          className="w-10 h-10 rounded-[10px] object-cover border border-white/10 bg-white/10 shadow-soft"
        />
        <span>{t("brand")}</span>
      </a>

      <div className="flex items-center gap-2 flex-wrap justify-end max-[640px]:absolute max-[640px]:top-2 max-[640px]:right-2.5 rtl:max-[640px]:right-auto rtl:max-[640px]:left-2.5 max-[640px]:flex-col max-[640px]:items-end rtl:max-[640px]:items-start max-[640px]:gap-1">
        <div className="inline-flex border border-white/15 rounded-full overflow-hidden bg-white/8 backdrop-blur-sm">
          {["en", "de", "ar"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`px-3 py-1.5 max-[640px]:px-2 max-[640px]:py-0.5 text-[0.78rem] max-[640px]:text-[0.6rem] font-semibold transition-colors ${
                lang === code ? "bg-white/80 text-slate-900" : "text-white/85 hover:bg-white/10"
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="inline-flex border border-white/15 rounded-full overflow-hidden bg-white/8 backdrop-blur-sm">
          {["USD", "EUR", "EGP"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              className={`px-3 py-1.5 max-[640px]:px-2 max-[640px]:py-0.5 text-[0.78rem] max-[640px]:text-[0.6rem] font-semibold transition-colors ${
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
