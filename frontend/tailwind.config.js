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
        background: "#060B14",
        surface: "#0D1527",
        "surface-card": "rgba(15, 23, 42, 0.78)",
        "surface-border": "rgba(255, 255, 255, 0.09)",
        luxury: {
          dark: "#060B14",
          surface: "#0D1527",
          card: "#111C33",
          border: "rgba(255, 255, 255, 0.08)",
          cyan: "#06B6D4",
          emerald: "#10B981",
          amber: "#F59E0B",
          gold: "#D97706",
          violet: "#8B5CF6",
          purple: "#A855F7",
          rose: "#F43F5E",
          sky: "#38BDF8",
          blue: "#2563EB",
        },
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
