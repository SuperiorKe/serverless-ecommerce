/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f0fdf6',
          100: '#dcfce9',
          200: '#bbeed3',
          300: '#7eedaf',
          400: '#3ce392',
          500: '#05f182', // Spring Green
          600: '#03c66a',
          700: '#049d56',
          800: '#067b46',
          900: '#07653a',
        },
        secondary: {
          50: '#f2f4f8',
          100: '#e1e5ee',
          200: '#c5ccdc',
          300: '#9ba7c2',
          400: '#6a7ba1',
          500: '#485a85',
          600: '#364468',
          700: '#2c3754',
          800: '#172d55', // Blue Zodiac
          900: '#1d263a',
        },
      },
    },
  },
  plugins: [],
}
