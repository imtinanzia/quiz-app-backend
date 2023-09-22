// Before (ESM-style imports)
// import { preset } from 'ts-jest';

// After (CommonJS-style require)
const { preset } = require('ts-jest');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
