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

const iterToPretty = (indent: number, acc: [any], coll: [any]) => {
  if (!coll.length) {
    return acc;
  }
  switch (coll[0]) {
    case '{': return iterToPretty(indent + 4, [...acc, coll[0]], coll.slice(1));
    case '}': return iterToPretty(indent - 4, [...acc, getIndent(indent - 2), coll[0]], coll.slice(1));
    case '\n':
      if (coll[1] !== '}') {
        return iterToPretty(indent, [...acc, coll[0], getIndent(indent)], coll.slice(1));
      }
      break;
    default: break;
  }
  return iterToPretty(indent, [...acc, coll[0]], coll.slice(1));
};

const toPretty = (stringDiff: string) => {
  const stringDifftoArr = stringDiff.split('');
  return iterToPretty(-4, [], stringDifftoArr).join('');
};

export default (diff: [any]) => toPretty(diffToString(prepareDiff(diff)));
