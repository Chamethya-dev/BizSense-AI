/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#020617",
        },
        surface: {
          DEFAULT: "#0f172a",
          overlay: "#1e293b",
          border: "#334155",
          raised: "#1e293b",
        },
        electric: "#38bdf8",
        jade: "#34d399",
        "amber-alert": "#fbbf24",
        "rose-alert": "#fb7185",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["monospace"],
      },
      fontWeight: {
        500: "500",
        600: "600",
        700: "700",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(4px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [],
}