import { jest, beforeEach } from '@jest/globals';

global.fetch = jest.fn();

beforeEach(() => {
  global.fetch.mockClear();
});