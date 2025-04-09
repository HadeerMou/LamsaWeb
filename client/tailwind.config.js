/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: "class", // or 'media' if you want dark mode
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "infinite-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-80% - 20px))" },
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
