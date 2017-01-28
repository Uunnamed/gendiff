// @flow
import getParser from './getparser';

const isObject = obj => (Object.prototype.toString.call(obj) === '[object Object]');
const isArray = obj => (Object.prototype.toString.call(obj) === '[object Array]');

const statusToChar = (status) => {
  switch (status) {
    case 'no_change': return ' ';
    case 'add': return '+';
    case 'remove': return '-';
    default: return '';
  }
};
const objToStr = obj => Object.keys(obj).map(key => `"${key}": "${obj[key]}"`).join('\n');
const toString = (arr, tab = '') => {
  const newTab = `  ${tab}`;
  const result = arr.reduce((acc, key) => {
    if (key.children.length) {
      return `${acc}  ${key.name}: ${toString(key.children, `${newTab}`)}\n${tab}`;
    }
    if (isObject(key.data)) {
      return `${acc}${statusToChar(key.status)} ${key.name}: {\n  ${newTab}${objToStr(key.data)}\n${newTab}}\n${tab}`;
    }
    return `${acc}${statusToChar(key.status)} ${key.name}: ${key.data}\n${tab}`;
  }, `${tab}`);
  return `{\n${result}}`;
};

const diff = (before, after) => {
  const keys = new Set();
  [before, after].map(obj => Object.keys(obj).map(key => keys.add(key)));
  return Array.from(keys).reduce((result, key) => {
    if (isObject(before[key]) && isObject(after[key])) {
      return [...result, { name: key, status: 'no_change', data: [], children: diff(before[key], after[key]) }];
    }
    if (before[key] === after[key]) {
      return [...result, { name: key, status: 'no_change', data: before[key], children: [] }];
    }
    if (after[key]) {
      result.push({ name: key, status: 'add', data: after[key], children: [] });
    }
    if (before[key]) {
      result.push({ name: key, status: 'remove', data: before[key], children: [] });
    }
    return result;
  }, []);
};


const compare = (type: string, file1: string, file2: string) => {
  const parse = getParser(type);
  const [before, after] = [file1, file2].map(parse);
  const resultMap = diff(before, after);
  return toString(resultMap);
};

export default compare;
