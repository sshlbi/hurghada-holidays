/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#06283D",
        deep: "#0A3A5E",
        "deep-2": "#08304D",
        sea: "#1363DF",
        "sea-light": "#47B5FF",
        lagoon: "#7DE5ED",
        coral: "#F4C27A",
        "coral-hover": "#E8AE5C",
        sand: "#F5EDE0",
        pearl: "#F8FBFF",
        gold: "#F4C27A",
        ink: "#06283D",
        muted: "#5B7285",
        border: "#C9D8DE",
        surface: "#F8FBFF",
        "surface-2": "#E7EEEE",
        success: "#3FBF8A",
        danger: "#E5604D",
        warn: "#F4C27A",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        "display-ar": ["Amiri", "Cairo", "serif"],
        "body-ar": ["Cairo", "Tahoma", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 14px rgba(6, 40, 61, 0.18)",
        lifted: "0 16px 40px rgba(6, 40, 61, 0.35)",
        glass: "0 8px 32px rgba(6, 40, 61, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
        glow: "0 0 28px rgba(71, 181, 255, 0.45)",
      },
      backgroundImage: {
        "grand-total": "linear-gradient(135deg, #06283D, #0A3A5E 50%, #1363DF)",
      },
      keyframes: {
        rise: {
          "0%": { transform: "translateY(0) translateX(0)", opacity: 0 },
          "8%": { opacity: 0.7 },
          "92%": { opacity: 0.45 },
          "100%": { transform: "translateY(-115vh) translateX(var(--drift, 20px))", opacity: 0 },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3vw, 4vh, 0) scale(1.07)" },
        },
        sway: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(6px)" },
        },
        fadeUp: {
          from: { opacity: 0, transform: "translateY(14px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        rise: "rise linear infinite",
        drift: "drift 24s ease-in-out infinite",
        sway: "sway 7s ease-in-out infinite",
        fadeUp: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};