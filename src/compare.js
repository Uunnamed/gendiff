// @flow
import getParser from './getparser';

const isObject = obj => (Object.prototype.toString.call(obj) === '[object Object]');
const isMap = map => (Object.prototype.toString.call(map) === '[object Map]');

const toString = (obj: Object, tab = '') => {
  const newTab = `  ${tab}`;
  const result = Object.keys(obj).reduce((acc, key) => {
    if (isObject(obj[key])) {
      return `${acc}${key}: ${toString(obj[key], newTab)}\n${tab}`;
    }
    return `${acc}${key}: ${obj[key]}\n${tab}`;
  }, `${tab}`);
  return `{\n${result}}`;
};

const mapToObj = m => Array.from(m).reduce((acc, elem) => {
  if (isMap(elem[1])) {
    return { ...acc, [elem[0]]: mapToObj(elem[1]) };
  }
  return { ...acc, [elem[0]]: elem[1] };
}, {});

const diff = (before, after) => {
  const keys = new Set();
  [before, after].map(obj => Object.keys(obj).map(key => keys.add(key)));
  const mapResult = new Map();
  return Array.from(keys).reduce((result, key) => {
    if (before[key] === after[key]) {
      result.set(`  ${key}`, before[key]);
    } else if (isObject(before[key]) && isObject(after[key])) {
      result.set(`  ${key}`, diff(before[key], after[key]));
    } else {
      if (after[key]) {
        result.set(`+ ${key}`, after[key]);
      }
      if (before[key]) {
        result.set(`- ${key}`, before[key]);
      }
    }
    return result;
  }, mapResult);
};

const compare = (type: string, ...files) => {
  const parse = getParser(type);
  const [before, after] = files.map(parse);
  const resultMap = diff(before, after);
  return toString(mapToObj(resultMap));
};

export default compare;
