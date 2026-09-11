import { useEffect, useState } from "react";

function useParallax() {
  const [offsets, setOffsets] = useState([0, 0]);
  const speeds = [0.08, 0.05];

  useEffect(() => {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let ticking = false;
    function apply() {
      const y = window.scrollY || window.pageYOffset || 0;
      setOffsets(speeds.map((s) => y * s));
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(apply);
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return offsets;
}

export default function BackgroundScene() {
  const [y1, y2] = useParallax();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-abyss" aria-hidden="true">
      <div style={{ transform: `translate3d(0, ${y1}px, 0)` }} className="absolute inset-0">
        <div className="absolute -top-[16vw] -left-[10vw] w-[46vw] h-[46vw] max-w-[560px] max-h-[560px] rounded-full blur-[100px] opacity-25 bg-[radial-gradient(circle_at_35%_35%,#1C7C93,transparent_70%)]" />
      </div>
      <div style={{ transform: `translate3d(0, ${y2}px, 0)` }} className="absolute inset-0 hidden sm:block">
        <div className="absolute -bottom-[14vw] -right-[10vw] w-[38vw] h-[38vw] max-w-[480px] max-h-[480px] rounded-full blur-[100px] opacity-15 bg-[radial-gradient(circle_at_60%_40%,#D3A34C,transparent_72%)]" />
      </div>
      {/* subtle premium grain */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}