import { useState } from "react";
import { useApp } from "../context/AppContext";

const iso = (d) => d.toISOString().slice(0, 10);

export default function Hero() {
  const { t, startBooking, setGuest } = useApp();
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(2);

  const today = iso(new Date());
  const minDeparture = arrival ? iso(new Date(new Date(arrival).getTime() + 86400000)) : today;

  function onArrival(e) {
    const v = e.target.value;
    setArrival(v);
    if (departure && new Date(departure) <= new Date(v)) setDeparture("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setGuest((g) => ({ ...g, arrival, departure, adults: Math.max(1, Number(adults) || 1) }));
    startBooking();
  }

  return (
    <section
      className="relative min-h-[min(78vh,640px)] flex items-center justify-center text-center text-white px-5 pt-16 pb-24 overflow-hidden isolate -mt-[76px]"
      style={{
        backgroundImage:
          "linear-gradient(165deg, rgba(6,40,61,0.78) 0%, rgba(19,99,223,0.28) 55%, rgba(6,40,61,0.85) 100%), url(assets/images/hero.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #06283D)" }}
      />
      <div className="relative z-10 w-full max-w-[860px] pt-20">
        <span className="inline-block px-5 py-2 rounded-full glass-soft !rounded-full text-[0.74rem] tracking-[0.14em] uppercase font-semibold text-gold mb-6">
          {t("heroBadge")}
        </span>
        <h1 className="font-display font-bold text-[clamp(2.1rem,5.2vw,3.5rem)] leading-[1.12] mb-4 tracking-tight drop-shadow-[0_4px_24px_rgba(6,40,61,0.5)]">
          {t("heroTitle")}
        </h1>
        <p className="text-[clamp(1rem,1.8vw,1.15rem)] text-white/85 max-w-[540px] mx-auto mb-9 leading-relaxed">
          {t("heroSub")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="glass p-3.5 grid grid-cols-[1fr_1fr_0.7fr_auto] max-[760px]:grid-cols-2 max-[480px]:grid-cols-1 gap-3 items-end text-start"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.74rem] font-semibold uppercase tracking-wide text-lagoon">{t("arrival")}</span>
            <input type="date" min={today} value={arrival} onChange={onArrival} className="glass-input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.74rem] font-semibold uppercase tracking-wide text-lagoon">{t("departure")}</span>
            <input type="date" min={minDeparture} value={departure} onChange={(e) => setDeparture(e.target.value)} className="glass-input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.74rem] font-semibold uppercase tracking-wide text-lagoon">{t("adults")}</span>
            <input type="number" min="1" max="20" value={adults} onChange={(e) => setAdults(e.target.value)} className="glass-input" />
          </label>
          <button type="submit" className="btn-primary max-[760px]:col-span-2 max-[480px]:col-span-1 h-[44px]">
            {t("ctaBook")}
            <span className="rtl:rotate-180">→</span>
          </button>
        </form>

        <div className="flex flex-wrap gap-2.5 justify-center mt-7 text-[0.78rem] font-medium">
          {["trustLocal", "trustLang", "trustConfirm"].map((k) => (
            <span key={k} className="glass-soft !rounded-full px-3.5 py-1.5 text-white/85">
              {t(k)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}