/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
      },
      animation: {
        highlight: "highlight 1.5s infinite",
      },
      keyframes: {
        highlight: {
          "0%, 100%": { opacity: "0.3", scale: "1" },
          "50%": { opacity: "1", scale: "1.3", backgroundColor: "#3b82f6" },
        },
      },
    },
  },
  plugins: [],
};
