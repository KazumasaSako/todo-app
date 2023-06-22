const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './src',
})
const customJestConfig = {
  roots: ['<rootDir>/src/__tests__'],
  moduleDirectories: ['node_modules', '<rootDir>/src/'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex:".*\.test\.tsx"
}

module.exports = createJestConfig(customJestConfig)