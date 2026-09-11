import { useApp } from "../../context/AppContext";

function SummaryRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3 py-1.5 text-[0.92rem] border-b border-dashed border-white/10 last:border-0">
      <span className="text-lagoon/60">{label}</span>
      <span className="text-sand">{value}</span>
    </div>
  );
}

function SummaryBlock({ title, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-glass p-5 mb-3.5">
      <h3 className="text-[0.85rem] uppercase tracking-wide text-sea-light font-bold mb-3">{title}</h3>
      {children}
    </div>
  );
}

export default function StepSummary() {
  const { t, loc, money, guest, calcTotals, submitBooking, submitting, prevStep, fxIsLive, currency } = useApp();
  const c = calcTotals();
  const hotelName = c.hotel ? loc(c.hotel).name : t("summaryNone");

  return (
    <div>
      <div className="flex justify-start mb-4">
        <button type="button" onClick={prevStep} className="rounded-full bg-white/5 backdrop-blur-md border border-white/15 px-4 py-2 font-medium text-[0.85rem] text-sand transition-all duration-200 hover:bg-white/10 hover:border-white/30">
          {t("back")}
        </button>
      </div>
      <SummaryBlock title={t("summaryGuest")}>
        <SummaryRow label={t("fullName")} value={guest.fullName} />
        <SummaryRow label={t("nationality")} value={guest.nationality} />
        <SummaryRow label={t("email")} value={guest.email} />
        <SummaryRow label={t("phone")} value={guest.phone} />
        <SummaryRow label={t("guestsLabel")} value={`${c.adults} ${t("adultsShort")}, ${c.children} ${t("childrenShort")}`} />
        <SummaryRow label={`${t("arrival")} → ${t("departure")}`} value={`${guest.arrival} → ${guest.departure}`} />
        {guest.notes && <SummaryRow label={t("notes")} value={guest.notes} />}
      </SummaryBlock>

      <SummaryBlock title={t("summaryHotel")}>
        {c.hotel ? (
          <>
            <SummaryRow label={hotelName} value={`${money(c.hotel.price)} ${t("approxPerNight")}`} />
            <SummaryRow label={t("nightsLabel")} value={c.nights} />
            <SummaryRow label={t("hotelTotal")} value={<span className="font-mono font-semibold text-white">{money(c.hotelUSD)}</span>} />
            <p className="text-[0.78rem] text-lagoon/50 mt-2">{t("hotelPriceNotice")}</p>
          </>
        ) : (
          <SummaryRow label={t("summaryNone")} value="—" />
        )}
      </SummaryBlock>

      <SummaryBlock title={t("summaryAct")}>
        {c.actLines.length ? (
          c.actLines.map((l) => <SummaryRow key={l.id} label={l.name} value={<span className="font-mono font-semibold text-white">{money(l.usd)}</span>} />)
        ) : (
          <SummaryRow label={t("summaryNone")} value="—" />
        )}
        <SummaryRow label={t("actTotal")} value={<span className="font-mono font-semibold text-white">{money(c.actUSD)}</span>} />
      </SummaryBlock>

      <SummaryBlock title={t("summaryTrans")}>
        {c.trLines.length ? (
          c.trLines.map((l) => <SummaryRow key={l.id} label={l.name} value={<span className="font-mono font-semibold text-white">{money(l.usd)}</span>} />)
        ) : (
          <SummaryRow label={t("summaryNone")} value="—" />
        )}
        <SummaryRow label={t("transTotal")} value={<span className="font-mono font-semibold text-white">{money(c.trUSD)}</span>} />
      </SummaryBlock>

      <div className="flex justify-between items-center gap-3 px-[1.375rem] py-5 rounded-2xl text-white shadow-lifted bg-grand-total mt-2">
        <div>
          <div className="opacity-85 text-[0.85rem]">{t("grandTotal")}</div>
          <div className="text-[0.75rem] opacity-70 mt-1">{fxIsLive ? t("fxNoteLive") : t("fxNoteFallback")}</div>
        </div>
        <div className="font-mono font-bold text-2xl">
          {money(c.grand)} <span className="text-[0.9rem] font-medium">{currency}</span>
        </div>
      </div>

      <div className="px-4 py-3 rounded-xl bg-warn/10 border border-warn/30 text-[0.86rem] text-sand my-4">
        {t("approxNote")}
      </div>

      <div className="flex justify-end mt-7">
        <button
          type="button"
          onClick={submitBooking}
          disabled={submitting}
          className="rounded-full px-6 py-2.5 font-medium text-[0.92rem] text-white bg-white/10 backdrop-blur-md border border-white/25 shadow-glass transition-all duration-200 hover:bg-white/20 hover:border-white/40 disabled:opacity-50"
        >
          {submitting ? t("sending") : t("submitBooking")}
        </button>
      </div>
    </div>
  );
}