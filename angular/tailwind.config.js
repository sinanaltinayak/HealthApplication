/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        // => @media (min-height: 800px) { ... }

        'smly': { 'raw': '(min-height: 480px)' },
        'smy': { 'raw': '(min-height: 640px)' },
        'mdy': { 'raw': '(min-height: 768px)' },
        'lgy': { 'raw': '(min-height: 840px)' },
        'xly': { 'raw': '(min-height: 1080px)' },
        '2xly': { 'raw': '(min-height: 1280px)' },
      }
    },
  },
  plugins: [],
}
