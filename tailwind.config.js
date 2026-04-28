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
        navy: {
          DEFAULT: '#0A1F44',
          dark: '#061429',
          light: '#1A3A6B',
        },
        orange: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
          light: '#FF8355',
        },
        cool: {
          50: '#F8F9FB',
          100: '#F1F3F7',
          200: '#E5E8EF',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
