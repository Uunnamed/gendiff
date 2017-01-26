// @flow
import getParser from './getparser';

const mapToString = (m: Object) => {
  const result = Array.from(m).reduce((acc, key) => `${acc}${key[0]}: ${key[1]}\n`, '');
  return `{\n${result}}`;
};

const compare = (file1: string, file2: string, type: string) => {
  const keys = new Set();
  const parseFiles = getParser(type);
  const [before, after] = parseFiles(file1, file2);
  [before, after].map(obj => Object.keys(obj).map(key => keys.add(key)));
  const resultMap = Array.from(keys).reduce((result, key) => {
    if (before[key] === after[key]) {
      result.set(`  ${key}`, before[key]);
    } else {
      if (after[key]) {
        result.set(`+ ${key}`, after[key]);
      }
      if (before[key]) {
        result.set(`- ${key}`, before[key]);
      }
    }
    return result;
  }, new Map());
  return mapToString(resultMap);
};

export default compare;
