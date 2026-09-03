import { useEffect, useRef, useState } from "react";

function useParallax() {
  const [offsets, setOffsets] = useState([0, 0, 0]);
  const speeds = [0.18, 0.13, 0.09];

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

function Bubbles({ count = 32 }) {
  const bubbles = useRef(
    Array.from({ length: count }, () => ({
      size: 8 + Math.random() * 28,
      left: Math.random() * 100,
      duration: 14 + Math.random() * 16,
      delay: -(Math.random() * 30),
      drift: Math.random() * 60 - 30,
    }))
  ).current;

  return (
    <div className="absolute inset-0">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute -bottom-[10vh] rounded-full border border-white/30 animate-rise"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            "--drift": `${b.drift}px`,
            background:
              "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0.04) 70%)",
          }}
        />
      ))}
    </div>
  );
}

export default function BackgroundScene() {
  const [y1, y2, y3] = useParallax();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div style={{ transform: `translate3d(0, ${y1}px, 0)` }} className="absolute inset-0">
        <div className="absolute -top-[14vw] -left-[10vw] w-[52vw] h-[52vw] max-w-[680px] max-h-[680px] rounded-full blur-[60px] opacity-75 animate-drift bg-[radial-gradient(circle_at_35%_35%,#5FADB9,transparent_70%)]" />
      </div>
      <div style={{ transform: `translate3d(0, ${y2}px, 0)` }} className="absolute inset-0 hidden sm:block">
        <div className="absolute top-[28vh] -right-[12vw] w-[42vw] h-[42vw] max-w-[560px] max-h-[560px] rounded-full blur-[60px] opacity-50 animate-drift bg-[radial-gradient(circle_at_60%_40%,#D3A34C,transparent_72%)]" />
      </div>
      <div style={{ transform: `translate3d(0, ${y3}px, 0)` }} className="absolute inset-0">
        <div className="absolute -bottom-[16vw] left-[18vw] w-[46vw] h-[46vw] max-w-[600px] max-h-[600px] rounded-full blur-[60px] opacity-40 animate-drift bg-[radial-gradient(circle_at_45%_55%,#E2603D,transparent_72%)]" />
      </div>
      <Bubbles />
    </div>
  );
}
