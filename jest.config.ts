import type { Config } from 'jest';
import { resolve } from 'path';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  setupFiles: ['<rootDir>/tests/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testTimeout: 120000,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.ts',
    '!lib/**/*.d.ts'
  ]
};

export default config;