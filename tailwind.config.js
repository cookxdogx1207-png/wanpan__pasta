/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          bg: '#FAFAF7',
          wood: '#8B6F4E',
          'wood-light': '#C4956A',
          'wood-dark': '#5C4033',
          green: '#4A6741',
          'green-light': '#6B8F62',
          cream: '#F0E8D8',
          beige: '#E8DDD0',
          dark: '#2C2520',
          gray: '#6B6560',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto)', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif'],
      },
    },
  },
  plugins: [],
}
