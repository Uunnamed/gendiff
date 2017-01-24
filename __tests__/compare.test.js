// @flow
import compare from '../src/compare';

const before = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
};

const after = {
  host: 'hexlet.io',
  timeout: 20,
  verbose: true,
};

const result = {
  '  host': 'hexlet.io',
  '+ timeout': 20,
  '- timeout': 50,
  '- proxy': '123.234.53.22',
  '+ verbose': true,
};

test('compare', () => {
  expect(compare(before, after))
  .toEqual(expect.objectContaining(result));
});
