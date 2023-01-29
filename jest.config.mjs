// @ts-check

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// eslint-disable-next-line import/no-default-export
export default createJestConfig(customJestConfig);
