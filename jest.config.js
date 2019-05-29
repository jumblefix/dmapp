module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: { '~(.*)': '<rootDir>/src/$1' },
  globalSetup: './setup.js',
  globalTeardown: './teardown.js',
  coveragePathIgnorePatterns: ['<rootDir>/src/api/db.ts', '<rootDir>/coverage']
}
