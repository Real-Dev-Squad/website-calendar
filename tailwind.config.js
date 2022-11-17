/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: {
        resolutionBlue: '#041484',
        razzmatazz: '#E30464',
        feijoa: '#96D882',
        fern: '#6DB470',
      },
    },
  },
  variants: {},
  plugins: [],
};
