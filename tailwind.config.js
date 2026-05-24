/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F7F1E8",
        champagne: "#EADBC2",
        taupe: "#C8B79A",
        gold: "#B8893E",
        goldlight: "#D6A85A",
        golddeep: "#8E6324",
        ink: "#2B2A28",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        script: ["'Great Vibes'", "'Allura'", "cursive"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        arabic: ["'Amiri'", "Georgia", "serif"],
      },
      boxShadow: {
        seal: "0 6px 18px rgba(120, 75, 20, 0.45), inset 0 2px 6px rgba(255,255,255,0.25), inset 0 -4px 10px rgba(80,45,10,0.5)",
        card: "0 25px 60px -20px rgba(70, 50, 20, 0.35)",
        envelope: "0 30px 60px -25px rgba(80, 55, 25, 0.45)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        sealPulse: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        sealPulse: "sealPulse 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
