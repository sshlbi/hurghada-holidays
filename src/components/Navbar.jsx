import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { t, lang, setLang, currency, setCurrency } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 relative flex flex-wrap items-center justify-between gap-3 h-[72px] max-[640px]:h-auto max-[640px]:py-2.5 px-5 max-[640px]:px-3.5 bg-surface/90 backdrop-blur-md border-b border-border/70 transition-shadow ${
        scrolled ? "shadow-lifted" : "shadow-soft"
      }`}
    >
      <a
        href="#"
        className="flex items-center gap-2.5 font-display-brand font-display font-bold text-[1.2rem] max-[640px]:text-[1.05rem] text-deep tracking-tight whitespace-nowrap flex-1 sm:flex-none"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <span className="grid place-items-center w-9 h-9 rounded-[10px] bg-gradient-to-br from-sea to-deep text-white shadow-soft">
          ◆
        </span>
        <span>{t("brand")}</span>
      </a>

      <div className="flex items-center gap-2 flex-wrap justify-end max-[640px]:w-full max-[640px]:justify-between">
        <div className="inline-flex border border-border rounded-full overflow-hidden bg-surface max-[640px]:flex-1 max-[640px]:justify-center">
          {["en", "de", "ar"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setLang(code)}
              className={`px-3 py-1.5 text-[0.78rem] max-[400px]:text-[0.66rem] font-semibold transition-colors ${
                lang === code ? "bg-deep text-white" : "text-muted"
              }`}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="inline-flex border border-border rounded-full overflow-hidden bg-surface max-[640px]:flex-1 max-[640px]:justify-center">
          {["USD", "EUR", "EGP"].map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => setCurrency(code)}
              className={`px-3 py-1.5 text-[0.78rem] max-[400px]:text-[0.66rem] font-semibold transition-colors ${
                currency === code ? "bg-deep text-white" : "text-muted"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <div className="absolute left-0 right-0 -bottom-px h-px bg-border" />
    </header>
  );
}
