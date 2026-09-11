/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#061620",
        deep: "#0B3049",
        "deep-2": "#0A2438",
        sea: "#1C7C93",
        "sea-light": "#5FADB9",
        lagoon: "#9AD4CE",
        coral: "#E2603D",
        "coral-hover": "#C94F30",
        sand: "#EDE2CB",
        gold: "#D3A34C",
        ink: "#122531",
        muted: "#5B7285",
        border: "#C9D8DE",
        surface: "#FCFBF8",
        "surface-2": "#E7EEEE",
        success: "#3F9A6C",
        danger: "#C4432F",
        warn: "#D7A83B",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        "display-ar": ["Amiri", "Cairo", "serif"],
        "body-ar": ["Cairo", "Tahoma", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 4px 14px rgba(6, 22, 32, 0.12)",
        lifted: "0 16px 40px rgba(6, 22, 32, 0.22)",
        glass: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "grand-total": "linear-gradient(135deg, #0A2438, #0B3049 55%, #1C6B7E)",
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
