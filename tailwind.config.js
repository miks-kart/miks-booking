module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("@tailwindcss/typography")],
  theme: {
    extend: {
      colors: {
        "primary-dark": "var(--primary-dark)",
        "primary-gray": "var(--primary-gray)",
        "primary-gray-dark": "var(--primary-gray-dark)",
        "primary-gray-medium": "var(--primary-gray-medium)",
        "primary-red": "var(--primary-red)",
        "primary-red-active": "var(--primary-red-active)",
        "primary-red-hover": "var(--primary-red-hover)",
      },
      fontFamily: {
        sans: ["var(--font-rubik)"],
      },
    },
  },
};
