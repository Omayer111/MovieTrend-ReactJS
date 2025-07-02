/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-100": "#0f0d23",
        "light-100": "#cecefb",
        "light-200": "#a8b5db",
        "gray-100": "#9ca4ab",
      },
      boxShadow: {
        "light-100": "0 1px 3px 0 #cecefb",
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },
      fontFamily: {
        "dm-sans": ["DM Sans", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('/hero-bg.png')",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};
