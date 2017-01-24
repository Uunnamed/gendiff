// @flow
import compare from './compare';
import getContents from './getcontents';


const objToString = (obj: Object) => {
  const result = Object.keys(obj).reduce((acc, key) => `${acc}${key}: ${obj[key]}\n`, '');
  return `{\n${result}}`;
};

const compareJSON = (path1: string, path2: string) => {
  const [before, after] = getContents(path1, path2).map(file => JSON.parse(file));
  return objToString(compare(before, after));
};
export default compareJSON;
