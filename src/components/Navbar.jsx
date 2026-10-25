import { useApp } from "../context/AppContext";

const pill = (active) =>
  `px-3 py-1.5 max-[640px]:px-2 max-[640px]:py-0.5 text-[0.78rem] max-[640px]:text-[0.6rem] font-semibold transition-all duration-200 ${
    active ? "bg-white text-abyss shadow-[0_0_16px_rgba(125,229,237,0.55)]" : "text-white/85 hover:bg-white/15"
  }`;

export default function Navbar() {
  const { t, lang, setLang, currency, setCurrency, startBooking } = useApp();

  return (
    <header className="sticky top-3 z-30 mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-[1100px] flex flex-wrap items-center justify-between gap-3 h-[64px] max-[640px]:h-auto max-[640px]:py-2.5 px-4 max-[640px]:px-3.5 glass">
      <a
        href="#"
        className="flex items-center gap-2.5 font-display-brand font-display font-bold text-[1.15rem] max-[640px]:text-[1rem] text-white tracking-tight whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <img
          src="Icon.png"
          alt="Hurghada Holidays logo"
          className="w-10 h-10 rounded-full object-cover border border-white/25 bg-white/10 shadow-soft"
        />
        <span>{t("brand")}</span>
      </a>

      <nav className="hidden md:flex items-center gap-1">
        <button
          type="button"
          onClick={startBooking}
          className="px-3.5 py-1.5 rounded-full text-[0.85rem] font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
        >
          {t("navBook")}
        </button>
        <a
          href="#reviews"
          className="px-3.5 py-1.5 rounded-full text-[0.85rem] font-medium text-white/85 transition-colors hover:bg-white/15 hover:text-white"
        >
          {t("navReviews")}
        </a>
      </nav>

      <div className="flex items-center gap-2 flex-wrap justify-end max-[640px]:absolute max-[640px]:top-2 max-[640px]:right-2.5 rtl:max-[640px]:right-auto rtl:max-[640px]:left-2.5 max-[640px]:flex-col max-[640px]:items-end rtl:max-[640px]:items-start max-[640px]:gap-1">
        <div className="inline-flex border border-white/20 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
          {["en", "de", "ar"].map((code) => (
            <button key={code} type="button" onClick={() => setLang(code)} aria-pressed={lang === code} className={pill(lang === code)}>
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="inline-flex border border-white/20 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
          {["USD", "EUR", "EGP"].map((code) => (
            <button key={code} type="button" onClick={() => setCurrency(code)} aria-pressed={currency === code} className={pill(currency === code)}>
              {code}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}