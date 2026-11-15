import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        pink: "#FF2E88",
        electric: "#1E3A8A",
        purple: "#7B2BFF",
        orange: "#FF5A1F",
        yellow: "#FFE14D",
        lime: "#C6FF3D",
        coral: "#FF6B6B",
        sky: "#7FD4FF",
        // NEW Premium Colors
        deep: "#1A0B2E",      // Very dark purple
        magenta: "#D90368",   // Rich deep pink
        burnt: "#E36414",     // Sophisticated orange
        sand: "#F4F1EA",      // Warm off-white
        royal: "#0F084B",     // Deepest blue
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica Neue", "sans-serif"],
        body: ["var(--font-body)", "Ubuntu", "sans-serif"],
        poster: ["var(--font-poster)", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;