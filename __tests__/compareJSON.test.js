// @flow

import * as path from 'path';
import compareJSON from '../src/compareJSON';


const path1 = path.resolve(__dirname, '__fixtures__/before.json');
const path2 = path.resolve(__dirname, '__fixtures__/after.json');
test('compareJSON', () => {
  expect(compareJSON(path1, path2))
  .toBe('{\n  host: hexlet.io\n+ timeout: 20\n- timeout: 50\n- proxy: 123.234.53.22\n+ verbose: true\n}');
});
