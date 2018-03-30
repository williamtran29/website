module.exports = {
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: 'jest-styled-components',
  setupFiles: ['<rootDir>/src/testUtils/setupUnitTests.js'],
  testMatch: ['<rootDir>/src/**/*.test.js'],
}
