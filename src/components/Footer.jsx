import { useApp } from "../context/AppContext";
import { useReveal } from "../utils/useReveal";

export default function Footer() {
  const { t, startBooking } = useApp();
  const col1 = useReveal();
  const col2 = useReveal();
  const col3 = useReveal();

  return (
    <footer
      className="bg-deep-2 text-sand/90 pt-12 pb-7 px-5"
      style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)", backgroundSize: "22px 22px" }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-[2fr_1fr_1fr] max-[700px]:grid-cols-1 gap-8 mb-8">
          <div ref={col1} className="reveal">
            <h4 className="font-display font-semibold text-white text-[1.1rem] mb-3">{t("brand")}</h4>
            <p className="text-[0.9rem] text-sand/80">{t("footerAbout")}</p>
            <div className="flex gap-3 mt-3.5">
              <a href="https://wa.me/201093835275" target="_blank" rel="noopener" aria-label="WhatsApp" className="w-[38px] h-[38px] rounded-full bg-white/10 backdrop-blur-md border border-white/15 grid place-items-center text-white transition-all duration-200 hover:bg-white/20 hover:border-white/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/><path d="M12 2C6.48 2 2 6.48 2 12c0 1.77.46 3.45 1.27 4.91L2 22l5.25-1.38A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18.2c-1.6 0-3.1-.43-4.4-1.18l-.31-.18-3.12.82.83-3.04-.2-.33A8.17 8.17 0 013.8 12 8.2 8.2 0 0112 3.8 8.2 8.2 0 0120.2 12 8.2 8.2 0 0112 20.2z"/></svg>
              </a>
              <a href="mailto:hurghadaholidays434@gmail.com" aria-label="Email" className="w-[38px] h-[38px] rounded-full bg-white/10 backdrop-blur-md border border-white/15 grid place-items-center text-white transition-all duration-200 hover:bg-white/20 hover:border-white/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="w-[38px] h-[38px] rounded-full bg-white/10 backdrop-blur-md border border-white/15 grid place-items-center text-white transition-all duration-200 hover:bg-white/20 hover:border-white/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M14 8h3V4h-3c-2.76 0-5 2.24-5 5v2H7v4h2v7h4v-7h3l1-4h-4V9c0-.55.45-1 1-1z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="w-[38px] h-[38px] rounded-full bg-white/10 backdrop-blur-md border border-white/15 grid place-items-center text-white transition-all duration-200 hover:bg-white/20 hover:border-white/30">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
          <div ref={col2} className="reveal">
            <h4 className="font-display font-semibold text-white text-[1.1rem] mb-3">{t("contact")}</h4>
            <ul className="flex flex-col gap-2 text-[0.9rem]">
              <li><a href="mailto:hurghadaholidays434@gmail.com" className="hover:text-sea-light transition-colors">hurghadaholidays434@gmail.com</a></li>
              <li><a href="tel:+201093835275" className="hover:text-sea-light transition-colors">+20 109 383 5275</a></li>
              <li>{t("location")}</li>
            </ul>
          </div>
          <div ref={col3} className="reveal">
            <h4 className="font-display font-semibold text-white text-[1.1rem] mb-3">{t("quickLinks")}</h4>
            <ul className="flex flex-col gap-2 text-[0.9rem]">
              <li>
                <a
                  href="#booking"
                  onClick={(e) => {
                    e.preventDefault();
                    startBooking();
                  }}
                  className="hover:text-sea-light transition-colors"
                >
                  {t("navBook")}
                </a>
              </li>
              <li><a href="#reviews" className="hover:text-sea-light transition-colors">{t("navReviews")}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-[1.125rem] text-[0.82rem] text-sand/60 text-center">
          <p className="max-w-[640px] mx-auto mb-2.5 leading-relaxed opacity-85">{t("privacyNote")}</p>
          <span>{t("copyright")}</span>
        </div>
      </div>
    </footer>
  );
}