module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off', // TODO: throws an unexpected error need to fix this later.
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          'examples/**',
          'examples-native/**',
          '**/example/**',
          '*.js',
          '**/*.test.js',
          '**/*.stories.*',
          '**/scripts/*.js',
          '**/stories/**/*.js',
          '**/__tests__/**/*.js',
          '**/.storybook/**/*.*',
        ],
        peerDependencies: true,
      },
    ],
  },
};
