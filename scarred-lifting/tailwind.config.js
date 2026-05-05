/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-black': '#0A0A0A',
        'dark-metal': '#1C1C1E',
        kaki: '#5C6433',
        'kaki-light': '#8A9142',
        cream: '#F0EDE6',
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Barlow Condensed', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
