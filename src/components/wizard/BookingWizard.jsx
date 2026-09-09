import { useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import WizardProgress from "./WizardProgress";
import StepActivities from "./StepActivities";
import StepHotels from "./StepHotels";
import StepTransport from "./StepTransport";
import StepGuestInfo from "./StepGuestInfo";
import StepSummary from "./StepSummary";
import StepConfirm from "./StepConfirm";

const STEPS = [StepActivities, StepHotels, StepTransport, StepGuestInfo, StepSummary, StepConfirm];

export default function BookingWizard() {
  const { t, bookingStarted, step } = useApp();
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!bookingStarted) return;
    const id = requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(id);
  }, [bookingStarted, step]);

  if (!bookingStarted) return null;

  const StepComponent = STEPS[step];

  return (
    <section ref={sectionRef} className="pt-10 pb-14 px-5" id="booking">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-7">
          <h2 className="font-display font-semibold text-[clamp(1.65rem,3vw,2.2rem)] text-sand mb-2 tracking-tight">
            {t("bookingTitle")}
          </h2>
          <p className="max-w-[560px] text-lagoon/90">{t("bookingSub")}</p>
        </div>
        <WizardProgress />
        <div key={step} className="animate-fadeUp">
          <StepComponent />
        </div>
      </div>
    </section>
  );
}
