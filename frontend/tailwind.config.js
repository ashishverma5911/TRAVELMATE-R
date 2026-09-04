/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#090E17",
        surface: "#111927",
        "surface-card": "rgba(23, 32, 51, 0.75)",
        "surface-border": "rgba(255, 255, 255, 0.08)",
        primary: {
          50: "#EEF2FF",
          500: "#4F46E5",
          600: "#4338CA",
          700: "#3730A3",
        },
        brand: {
          saffron: "#F59E0B",
          emerald: "#10B981",
          crimson: "#EF4444",
          cyan: "#06B6D4",
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
