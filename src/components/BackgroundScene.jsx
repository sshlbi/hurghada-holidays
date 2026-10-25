import { useEffect, useState } from "react";

function useParallax() {
  const [offsets, setOffsets] = useState([0, 0, 0]);
  const speeds = [0.08, 0.05, 0.03];

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
  const [y1, y2, y3] = useParallax();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-abyss" aria-hidden="true">
      <div style={{ transform: `translate3d(0, ${y1}px, 0)` }} className="absolute inset-0">
        <div className="absolute -top-[16vw] -left-[10vw] w-[52vw] h-[52vw] max-w-[640px] max-h-[640px] rounded-full blur-[110px] opacity-40 bg-[radial-gradient(circle_at_35%_35%,#1363DF,transparent_70%)]" />
      </div>
      <div style={{ transform: `translate3d(0, ${y3}px, 0)` }} className="absolute inset-0">
        <div className="absolute top-[38%] -right-[12vw] w-[40vw] h-[40vw] max-w-[520px] max-h-[520px] rounded-full blur-[110px] opacity-30 bg-[radial-gradient(circle_at_50%_50%,#7DE5ED,transparent_70%)]" />
      </div>
      <div style={{ transform: `translate3d(0, ${y2}px, 0)` }} className="absolute inset-0 hidden sm:block">
        <div className="absolute -bottom-[14vw] -left-[6vw] w-[38vw] h-[38vw] max-w-[480px] max-h-[480px] rounded-full blur-[120px] opacity-20 bg-[radial-gradient(circle_at_60%_40%,#F4C27A,transparent_72%)]" />
      </div>
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