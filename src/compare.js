// @flow
import getParser from './getparser';

const isObject = obj => (Object.prototype.toString.call(obj) === '[object Object]');

const toString = (obj: Object, tab = '') => {
  const newTab = `  ${tab}`;
  const result = Object.keys(obj).reduce((acc, key) => {
    if (isObject(obj[key])) {
      return `${acc}${key}: ${toString(obj[key], `${newTab}`)}\n${tab}`;
    }
    if (key.indexOf(' ') === -1) {
      return `${acc}  "${key}": "${obj[key]}"\n${tab}`;
    }
    return `${acc}${key}: ${obj[key]}\n${tab}`;
  }, `${tab}`);
  return `{\n${result}}`;
};

const diff = (before, after) => {
  const keys = new Set();
  [before, after].map(obj => Object.keys(obj).map(key => keys.add(key)));
  return Array.from(keys).reduce((result, key) => {
    if (isObject(before[key]) && isObject(after[key])) {
      return { ...result, [`  ${key}`]: diff(before[key], after[key]) };
    }
    if (before[key] === after[key]) {
      return { ...result, [`  ${key}`]: before[key] };
    }
    const add = after[key] ? { [`+ ${key}`]: after[key] } : {};
    const del = before[key] ? { [`- ${key}`]: before[key] } : {};
    return { ...result, ...add, ...del };
  }, {});
};


const compare = (type: string, ...files) => {
  const parse = getParser(type);
  const [before, after] = files.map(parse);
  const resultMap = diff(before, after);
  console.log(toString(resultMap));
  return toString(resultMap);
  // return JSON.stringify(resultMap, null, 2);
};

export default compare;
