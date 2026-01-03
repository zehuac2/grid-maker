import { expect, test } from 'vitest';
import { getGridTextVariable, getGridLineVariable } from './colors';

const isCSSVariable = (value: string) => value.startsWith('--');

test('getGridTextVariable', () => {
  expect(getGridTextVariable()).toSatisfy(isCSSVariable);
});

test('getGridLineVariable', () => {
  expect(getGridLineVariable()).toSatisfy(isCSSVariable);
});
