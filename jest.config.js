import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('@jest/types').Config.InitialOptions} */
const customJestConfig = {};

// eslint-disable-next-line import/no-default-export
export default createJestConfig(customJestConfig);
