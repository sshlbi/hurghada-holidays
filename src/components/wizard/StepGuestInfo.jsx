import { useApp } from "../../context/AppContext";

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.85rem] font-semibold text-sand">{label}</label>
      {children}
      <span className="text-[0.78rem] text-[#ff9280] min-h-[1.1em]">{error || ""}</span>
    </div>
  );
}

const inputClass = (hasError) =>
  `rounded-xl border px-3.5 py-2.5 bg-white/5 backdrop-blur-md text-white placeholder:text-white/30 transition-shadow focus:outline-none focus:ring-2 focus:ring-sea-light/30 ${
    hasError ? "border-[#ff9280]" : "border-white/15 focus:border-sea-light"
  }`;

export default function StepGuestInfo() {
  const { t, guest, setGuest, errors, nights, nextStep, prevStep } = useApp();

  const update = (key) => (e) => setGuest((g) => ({ ...g, [key]: e.target.value }));

  const today = new Date().toISOString().slice(0, 10);
  const minDeparture = guest.arrival
    ? new Date(new Date(guest.arrival).getTime() + 86400000).toISOString().slice(0, 10)
    : today;

  const durationLabel = nights ? `${nights} ${nights === 1 ? t("night") : t("nights")}` : t("selectDates");

  return (
    <div className="p-6 max-[480px]:p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass">
      <div className="flex justify-start mb-4">
        <button type="button" onClick={prevStep} className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("back")}
        </button>
      </div>
      <div className="grid grid-cols-2 max-[700px]:grid-cols-1 gap-4">
        <Field label={t("fullName")} error={errors.fullName}>
          <input type="text" autoComplete="name" placeholder={t("phName")} value={guest.fullName} onChange={update("fullName")} className={inputClass(errors.fullName)} />
        </Field>
        <Field label={t("nationality")} error={errors.nationality}>
          <input type="text" placeholder={t("phNationality")} value={guest.nationality} onChange={update("nationality")} className={inputClass(errors.nationality)} />
        </Field>
        <Field label={t("email")} error={errors.email}>
          <input type="email" autoComplete="email" placeholder="name@example.com" value={guest.email} onChange={update("email")} className={inputClass(errors.email)} />
        </Field>
        <Field label={t("phone")} error={errors.phone}>
          <input type="tel" autoComplete="tel" placeholder="+49 170 1234567" value={guest.phone} onChange={update("phone")} className={inputClass(errors.phone)} />
        </Field>
        <Field label={t("adults")} error={errors.adults}>
          <input type="number" min="1" max="20" value={guest.adults} onChange={update("adults")} className={inputClass(errors.adults)} />
        </Field>
        <Field label={t("children")} error={errors.children}>
          <input type="number" min="0" max="15" value={guest.children} onChange={update("children")} className={inputClass(errors.children)} />
        </Field>
        <Field label={t("arrival")} error={errors.arrival}>
          <input type="date" min={today} value={guest.arrival} onChange={update("arrival")} className={inputClass(errors.arrival)} />
        </Field>
        <Field label={t("departure")} error={errors.departure}>
          <input type="date" min={minDeparture} value={guest.departure} onChange={update("departure")} className={inputClass(errors.departure)} />
        </Field>
        <div className="col-span-2 max-[700px]:col-span-1">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-sand font-semibold text-[0.9rem]">
            {durationLabel}
          </span>
        </div>
        <div className="col-span-2 max-[700px]:col-span-1 flex flex-col gap-1.5">
          <label className="text-[0.85rem] font-semibold text-sand">{t("notes")}</label>
          <textarea rows="3" placeholder={t("phNotes")} value={guest.notes} onChange={update("notes")} className="rounded-xl border border-white/15 px-3.5 py-2.5 bg-white/5 backdrop-blur-md text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sea-light/30 focus:border-sea-light" />
        </div>
      </div>
      <div className="flex justify-end mt-7">
        <button
          type="button"
          onClick={() => nextStep()}
          className="rounded-full px-6 py-2.5 font-medium text-[0.92rem] text-white bg-white/10 backdrop-blur-md border border-white/25 shadow-glass transition-all duration-200 hover:bg-white/20 hover:border-white/40"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}