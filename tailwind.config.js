module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    color: {
      resolutionBlue: '#041484',
      razzmatazz: '#E30464',
      feijoa: '#96D882',
      fern: '#6DB470',
    },
    extend: {
      colors: {
        primary: 'var(--color-nav)',
        "lime-green": 'var(--color-lime-green)'
      }
    },
  },
  variants: {},
  plugins: [],
};
