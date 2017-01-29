// @flow
import _ from 'lodash';

const isObject = obj => (Object.prototype.toString.call(obj) === '[object Object]');

const statusToChar = (status) => {
  switch (status) {
    case 'no_changed': return ' ';
    case 'added': return '+';
    case 'removed': return '-';
    default: return ' ';
  }
};

const getIndent = count => _.repeat(' ', count);

const objToStr = obj =>
`${Object.keys(obj).reduce((acc, key) => `${acc}${statusToChar(obj.status)} ${key}: ${obj[key]}\n`, '{\n')}}`;

const diffToString = (arrDiffObj: [any]) => {
  const result = arrDiffObj.map((key) => {
    if (key.status === 'object') {
      return `${statusToChar(key.status)} ${key.name}: ${diffToString(key.data)}\n`;
    }
    if (isObject(key.data)) {
      return `${statusToChar(key.status)} ${key.name}: ${objToStr(key.data)}\n`;
    }
    return `${statusToChar(key.status)} ${key.name}: ${key.data}\n`;
  });
  return `{\n${result.join('')}}`;
};

const prepareDiff = arrDiffObj =>
  _.flatten(arrDiffObj.map((obj) => {
    if (obj.status === 'object') {
      return { name: obj.name, status: 'object', data: prepareDiff(obj.data) };
    }
    if (obj.status === 'updated') {
      return [{ name: obj.name, status: 'added', data: obj.data[1] },
              { name: obj.name, status: 'removed', data: obj.data[0] }];
    }
    return obj;
  }));

const toPretty = (stringDiff: string) => {
  let indent = -4;
  const stringDifftoArr = stringDiff.split('');
  return _.flatten(stringDifftoArr.map((char, i, arr) => {
    switch (char) {
      case '{':
        indent += 4;
        break;
      case '}':
        indent -= 4;
        return [getIndent(indent + 2), char];
      default:
        break;
    }
    if (char === '\n' && arr[i + 1] !== '}') {
      return [char, getIndent(indent)];
    }
    return char;
  })).join('');
};

export default (diff: [any]) => toPretty(diffToString(prepareDiff(diff)));
