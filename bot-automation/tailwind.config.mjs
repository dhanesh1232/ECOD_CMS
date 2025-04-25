/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-slow": "pingScale 1s infinite ease-in-out",
      },
      keyframes: {
        pingScale: {
          "0%, 100%": { transform: "scale(0.75)", opacity: "0.6" },
          "50%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
