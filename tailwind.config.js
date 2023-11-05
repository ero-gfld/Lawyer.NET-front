/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3E398F",
        "primary-light": "#4F4C9F",
        "primary-lighter": "#8784B9",
        "primary-lightest": "#CFCEE3",
      },
    },
  },
  plugins: [],
};
