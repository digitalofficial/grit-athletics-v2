import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#000000",
        stark: "#FFFFFF",
        signal: "#E8FF00",
        concrete: "#2A2A2A",
        steel: "#444444",
        muted: "#999999",
        border: "#333333",
      },
      fontFamily: {
        display: ["var(--font-bebas-neue)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(8rem, 20vw, 16rem)", { lineHeight: "0.85", letterSpacing: "-0.02em" }],
        "hero-sub": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1", letterSpacing: "0.15em" }],
        massive: ["clamp(4rem, 10vw, 8rem)", { lineHeight: "0.9" }],
      },
      animation: {
        "counter-pulse": "counterPulse 2s ease-in-out infinite",
        "reveal-up": "revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "reveal-scale": "revealScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "bar-grow": "barGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        counterPulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        revealUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        revealScale: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        barGrow: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
