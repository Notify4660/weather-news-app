/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'white-sm': '0 4px 6px rgba(255, 255, 255, 0.1)',
        'white-md': '0 6px 12px rgba(255, 255, 255, 0.15)',
        'white-lg': '0 8px 16px rgba(255, 255, 255, 0.3)',
      }
    },
  },
  plugins: [],
}