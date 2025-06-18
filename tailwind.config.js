/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      aslam: ["aslam", "serif"],
      jameel: ["noori", "sans-serif"],
    },

    extend: {
      dark: {
        bg: "#1e293b", // Dark background
        text: "#e2e8f0", // Light text
      },
      light: {
        bg: "#2a3648",
        text: "#e2e8f0",
      },
      animation: {
        slideUpFadeIn: "slideUpFadeIn 0.3s ease-out forwards",
        "move-arrows": "move-arrows 0.3s linear infinite",
      },
      keyframes: {
        slideUpFadeIn: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "move-arrows": {
          "100%": { backgroundPosition: "20px 0" },
        },
      },
      colors: {
        lavender: {
          50: "#f9f7fc",
          100: "#f2eff8",
          200: "#e5def0",
          300: "#d1c3e4",
          400: "#b69fd3",
          500: "#9778bd",
          600: "#7a59a0",
          700: "#654883",
          800: "#5b4175",
          900: "#48355a",
          950: "#291a38",
        },
      },
    },
  },
  plugins: [],
};
