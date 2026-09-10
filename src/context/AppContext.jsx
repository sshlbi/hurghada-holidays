import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { I18N } from "../data/i18n";
import { HOTELS } from "../data/hotels";
import { ACTIVITIES } from "../data/activities";
import { TRANSPORT } from "../data/transport";
import { loadFxRates, FX_FALLBACK } from "../utils/fx";
import { formatMoney, loc as locItem } from "../utils/format";
import { loadReviewsFromSheet, sendBookingToSheet, sendReviewToSheet } from "../utils/sheets";

const STORAGE_LANG = "hh_lang";
const STORAGE_CUR = "hh_currency";

const AppContext = createContext(null);

const EMPTY_GUEST = {
  fullName: "",
  nationality: "",
  email: "",
  phone: "",
  adults: 2,
  children: 0,
  arrival: "",
  departure: "",
  notes: "",
};

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem(STORAGE_LANG) || "en");
  const [currency, setCurrencyState] = useState(() => localStorage.getItem(STORAGE_CUR) || "USD");
  const [fx, setFx] = useState(FX_FALLBACK);
  const [fxIsLive, setFxIsLive] = useState(false);

  const [bookingStarted, setBookingStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [hotelFilter, setHotelFilter] = useState("all");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState(() => new Set());
  const [selectedTransport, setSelectedTransport] = useState(() => new Set());
  const [guest, setGuest] = useState(EMPTY_GUEST);
  const [errors, setErrors] = useState({});
  const [warnStep, setWarnStep] = useState(null);
  const [refCode, setRefCode] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewStars, setReviewStars] = useState({ hotel: 5, activities: 5, transport: 5, overall: 5 });

  useEffect(() => {
    document.documentElement.lang = lang === "ar" ? "ar" : lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", lang === "ar");
    localStorage.setItem(STORAGE_LANG, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CUR, currency);
  }, [currency]);

  useEffect(() => {
    loadFxRates().then(({ rates, live }) => {
      setFx(rates);
      setFxIsLive(live);
    });
    loadReviewsFromSheet().then((remote) => {
      if (remote) setReviews(remote);
    });
  }, []);

  const t = useCallback((key) => (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key, [lang]);
  const loc = useCallback((item) => locItem(item, lang), [lang]);
  const money = useCallback((usd) => formatMoney(usd, currency, lang, fx), [currency, lang, fx]);

  const setLang = useCallback((v) => setLangState(v), []);
  const setCurrency = useCallback((v) => setCurrencyState(v), []);

  const nights = useMemo(() => {
    if (!guest.arrival || !guest.departure) return 0;
    const ms = new Date(guest.departure) - new Date(guest.arrival);
    return ms > 0 ? Math.round(ms / 86400000) : 0;
  }, [guest.arrival, guest.departure]);

  const toggleActivity = useCallback((id) => {
    setSelectedActivities((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setWarnStep((w) => (w === 0 ? null : w));
  }, []);

  const toggleTransport = useCallback((id) => {
    setSelectedTransport((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setWarnStep((w) => (w === 2 ? null : w));
  }, []);

  const chooseHotel = useCallback((id) => {
    setSelectedHotel(id);
    setWarnStep((w) => (w === 1 ? null : w));
  }, []);

  const hasSelectionForStep = useCallback(
    (s) => {
      if (s === 0) return selectedActivities.size > 0;
      if (s === 1) return !!selectedHotel;
      if (s === 2) return selectedTransport.size > 0;
      return true;
    },
    [selectedActivities, selectedHotel, selectedTransport]
  );

  const validateGuest = useCallback(() => {
    const next = {};
    let ok = true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!guest.fullName.trim()) { next.fullName = t("errRequired"); ok = false; }
    if (!guest.nationality.trim()) { next.nationality = t("errRequired"); ok = false; }
    if (!guest.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guest.email.trim())) {
      next.email = t("errEmail"); ok = false;
    }
    const phoneDigits = guest.phone.replace(/\D/g, "");
    if (!guest.phone.trim() || phoneDigits.length < 8 || !/^\+?[\d\s\-()]{8,}$/.test(guest.phone.trim())) {
      next.phone = t("errPhone"); ok = false;
    }
    if (!guest.adults || guest.adults < 1) { next.adults = t("errAdults"); ok = false; }
    if (!guest.arrival) { next.arrival = t("errRequired"); ok = false; }
    else if (new Date(guest.arrival) < today) { next.arrival = t("errPast"); ok = false; }
    if (!guest.departure) { next.departure = t("errRequired"); ok = false; }
    else if (guest.arrival && new Date(guest.departure) <= new Date(guest.arrival)) {
      next.departure = t("errDates"); ok = false;
    }

    setErrors(next);
    return ok;
  }, [guest, t]);

  const nextStep = useCallback(
    (force) => {
      if (!force && (step === 0 || step === 1 || step === 2) && !hasSelectionForStep(step)) {
        setWarnStep(step);
        return;
      }
      setWarnStep(null);
      if (step === 3 && !validateGuest()) return;
      if (step < 5) setStep((s) => s + 1);
    },
    [step, hasSelectionForStep, validateGuest]
  );

  const prevStep = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const skipActivities = useCallback(() => {
    setSelectedActivities(new Set());
    setWarnStep(null);
    nextStep(true);
  }, [nextStep]);

  const skipHotel = useCallback(() => {
    setSelectedHotel(null);
    setWarnStep(null);
    nextStep(true);
  }, [nextStep]);

  const skipTransport = useCallback(() => {
    setSelectedTransport(new Set());
    setWarnStep(null);
    nextStep(true);
  }, [nextStep]);

  const startBooking = useCallback(() => {
    setBookingStarted(true);
    setStep(0);
  }, []);

  const calcTotals = useCallback(() => {
    const n = nights || 1;
    const adults = Math.max(1, +guest.adults || 1);
    const children = Math.max(0, +guest.children || 0);
    const pax = adults + children * 0.7;

    const hotel = HOTELS.find((h) => h.id === selectedHotel);
    const hotelUSD = hotel ? hotel.price * n : 0;

    let actUSD = 0;
    const actLines = [];
    selectedActivities.forEach((id) => {
      const a = ACTIVITIES.find((x) => x.id === id);
      if (!a) return;
      const line = a.price * pax;
      actUSD += line;
      actLines.push({ id, name: loc(a).name, usd: line });
    });

    let trUSD = 0;
    const trLines = [];
    selectedTransport.forEach((id) => {
      const tr = TRANSPORT.find((x) => x.id === id);
      if (!tr) return;
      trUSD += tr.price;
      trLines.push({ id, name: loc(tr).name, usd: tr.price });
    });

    return {
      nights: n,
      adults,
      children,
      pax,
      hotel,
      hotelUSD,
      actUSD,
      trUSD,
      grand: hotelUSD + actUSD + trUSD,
      actLines,
      trLines,
    };
  }, [nights, guest.adults, guest.children, selectedHotel, selectedActivities, selectedTransport, loc]);

  const submitBooking = useCallback(async () => {
    const c = calcTotals();
    const ref = "HH-" + Date.now().toString(36).toUpperCase();
    const booking = {
      id: ref,
      status: "pending",
      submittedAt: new Date().toISOString(),
      lang,
      guest: {
        fullName: guest.fullName.trim(),
        nationality: guest.nationality.trim(),
        email: guest.email.trim(),
        phone: guest.phone.trim(),
        adults: c.adults,
        children: c.children,
        arrival: guest.arrival,
        departure: guest.departure,
        notes: guest.notes.trim(),
      },
      hotelId: c.hotel ? c.hotel.id : null,
      hotelName: c.hotel ? c.hotel.en.name : "",
      nights: c.nights,
      activities: c.actLines.map((l) => ({ id: l.id, name: l.name, usd: l.usd })),
      transport: c.trLines.map((l) => ({ id: l.id, name: l.name, usd: l.usd })),
      totals: { hotelUSD: c.hotelUSD, actUSD: c.actUSD, trUSD: c.trUSD, grandUSD: c.grand },
    };

    setSubmitting(true);
    try {
      await sendBookingToSheet(booking);
    } catch (err) {
      console.error("Could not send booking to the Google Sheet:", err);
    }
    setSubmitting(false);
    setRefCode(t("refLabel") + ": " + ref);
    setStep(5);
  }, [calcTotals, guest, lang, t]);

  const resetWizard = useCallback(() => {
    setStep(0);
    setSelectedHotel(null);
    setSelectedActivities(new Set());
    setSelectedTransport(new Set());
    setGuest(EMPTY_GUEST);
    setErrors({});
    setWarnStep(null);
  }, []);

  const submitReview = useCallback(
    (name, text) => {
      const review = {
        id: "R" + Date.now(),
        name,
        text,
        ratings: { ...reviewStars },
        at: new Date().toISOString(),
      };
      setReviews((prev) => [review, ...prev]);
      sendReviewToSheet(review).catch((err) => console.error("Could not sync review to sheet:", err));
      setReviewStars({ hotel: 5, activities: 5, transport: 5, overall: 5 });
    },
    [reviewStars]
  );

  const value = {
    lang, setLang, currency, setCurrency, fx, fxIsLive, t, loc, money,
    bookingStarted, startBooking,
    step, setStep, nextStep, prevStep,
    hotelFilter, setHotelFilter,
    selectedHotel, chooseHotel,
    selectedActivities, toggleActivity,
    selectedTransport, toggleTransport,
    skipActivities, skipHotel, skipTransport,
    guest, setGuest, errors, validateGuest,
    warnStep,
    nights,
    calcTotals,
    submitBooking, submitting, refCode,
    resetWizard,
    reviews, reviewStars, setReviewStars, submitReview,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}