import { useEffect, useRef, useState } from "react";

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

function Bubbles({ count = 10 }) {
  const bubbles = useRef(
    Array.from({ length: count }, () => ({
      size: 6 + Math.random() * 16,
      left: Math.random() * 100,
      duration: 22 + Math.random() * 18,
      delay: -(Math.random() * 30),
      drift: Math.random() * 30 - 15,
    }))
  ).current;

  return (
    <div className="absolute inset-0">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="absolute -bottom-[10vh] rounded-full border border-white/15 animate-rise"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            "--drift": `${b.drift}px`,
            background: "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), rgba(255,255,255,0.02) 70%)",
          }}
        />
      ))}
    </div>
  );
}

export default function BackgroundScene() {
  const [y1, y2] = useParallax();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div style={{ transform: `translate3d(0, ${y1}px, 0)` }} className="absolute inset-0">
        <div className="absolute -top-[16vw] -left-[10vw] w-[46vw] h-[46vw] max-w-[560px] max-h-[560px] rounded-full blur-[80px] opacity-35 bg-[radial-gradient(circle_at_35%_35%,#1C7C93,transparent_70%)]" />
      </div>
      <div style={{ transform: `translate3d(0, ${y2}px, 0)` }} className="absolute inset-0 hidden sm:block">
        <div className="absolute -bottom-[14vw] -right-[10vw] w-[38vw] h-[38vw] max-w-[480px] max-h-[480px] rounded-full blur-[80px] opacity-20 bg-[radial-gradient(circle_at_60%_40%,#D3A34C,transparent_72%)]" />
      </div>
      <Bubbles />
    </div>
  );
}