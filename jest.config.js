module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: { '~utils/(.*)': '<rootDir>/src/utils/$1' },
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.api.json',
    },
  },
};
