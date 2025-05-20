/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #2563eb, #3b82f6)',
        'gradient-jobs': 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      },
    },
  },
  plugins: [],
}