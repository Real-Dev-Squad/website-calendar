/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  reporters: [['github-actions', { silent: false }], 'summary'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 60,
      lines: 75,
      statements: 75,
    },
  },
};
