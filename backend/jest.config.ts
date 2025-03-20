/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fixes path issues for ESM
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Ensures TypeScript files are transformed
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
};
