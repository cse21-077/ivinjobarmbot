import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.test') });

// Add global test timeout
jest.setTimeout(120000);

// Add console log interceptor for better test output
const originalConsoleLog = console.log;
console.log = (...args) => {
  originalConsoleLog('[TEST]', ...args);
};