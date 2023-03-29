/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      borderRadius: {
        16: '4rem',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        grey: {
          DEFAULT: '#D6D3D1',
          light: '#E7E5E4',
          med: '#78716C',
          dark: '#44403C',
        },
        resolutionBlue: '#041484',
        razzmatazz: '#E30464',
        feijoa: '#96D882',
        fern: '#6DB470',
      },
      fontSize: {
        14: '3.5rem',
        18: '4.5rem',
      },
      spacing: {
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
