/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        bg: "#FDFBF0",
        ink: "#1A1A1A",
        accent: "#F4D03F",
        highlight: {
          yellow: "#F4D03F",
          purple: "#D2B4DE",
          blue: "#AED6F1",
          teal: "#A2D9CE",
          pink: "#F5B7B1",
          orange: "#FF914D",
          mint: "#7ED9CE",
        },
      },
      fontFamily: {
        heading: ["Anton", "Impact", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      borderRadius: {
        neo: "1.5rem",
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #1A1A1A",
        "neo-lg": "6px 6px 0px 0px #1A1A1A",
        "neo-sm": "2px 2px 0px 0px #1A1A1A",
      },
    },
  },
  plugins: [],
};
