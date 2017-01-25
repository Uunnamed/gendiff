// @flow

import * as path from 'path';
import getDiff from '../src/';


const json1 = path.resolve(__dirname, '__fixtures__/before.json');
const json2 = path.resolve(__dirname, '__fixtures__/after.json');
test('getDiffJSON', () => {
  expect(getDiff(json1, json2))
  .toBe('{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}');
});

const yaml1 = path.resolve(__dirname, '__fixtures__/before.json');
const yaml2 = path.resolve(__dirname, '__fixtures__/after.json');
test('getDiffYAML', () => {
  expect(getDiff(yaml1, yaml2))
  .toBe('{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}');
});
