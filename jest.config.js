module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: { '~(.*)': '<rootDir>/src/$1' },
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  testPathIgnorePatterns: ['<rootDir>/coverage', '<rootDir>/cypress'],
  collectCoverageFrom: ['<rootDir>/src/api/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/api/db.ts',
    '<rootDir>/coverage',
    '<rootDir>/cypress',
  ],
};
