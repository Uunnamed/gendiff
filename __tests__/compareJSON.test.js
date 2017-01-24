// @flow

import compareJSON from '../src/compareJSON';

const path1 = './__tests__/before.json';
const path2 = './__tests__/after.json';
test('compareJSON', () => {
  expect(compareJSON(path1, path2))
  .toBe('{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}');
});
