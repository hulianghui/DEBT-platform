/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        macos: {
          bg: '#121212',
          sidebar: '#1C1C1E',
          card: '#2C2C2E',
          accent: '#0A84FF',
          accentHover: '#0077ED',
          text: '#FFFFFF',
          textSecondary: '#8E8E93',
          border: '#38383A',
          success: '#30D158',
          warning: '#FFD60A',
          error: '#FF453A',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'macos': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'macos-light': '0 2px 10px rgba(0, 0, 0, 0.2)',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}