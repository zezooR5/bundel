/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0284c7', // Elbadry blue
          blueDark: '#0369a1',
          green: '#10b981', // Elbadry & UGREEN emerald green
          greenDark: '#059669',
          greenNeon: '#00e676',
          dark: '#0a0f1d',
          darkCard: '#111827',
          darkBorder: '#1f293d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(2, 132, 199, 0.4)',
        'card-elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
