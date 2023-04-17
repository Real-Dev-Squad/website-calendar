/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      borderRadius: {
        16: '4rem',
      },
      colors: {
        grey: {
          DEFAULT: '#D6D3D1',
          med: '#78716C',
          dark: '#44403C',
        },
        resolutionBlue: '#041484',
        razzmatazz: '#E30464',
        feijoa: '#96D882',
        fern: '#6DB470',
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        8: '2rem',
        16: '4rem',
        24: '6rem',
        32: '8rem',
      },
    },
  },
  variants: {},
  plugins: [],
};
