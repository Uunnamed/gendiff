// @flow
import _ from 'lodash';

const statusToChar = (status) => {
  switch (status) {
    case 'no_changed': return ' ';
    case 'added': return '+';
    case 'removed': return '-';
    default: return ' ';
  }
};

const getIndent = count => _.repeat(' ', count);

const objToStr = (obj) => {
  const result = Object.keys(obj).map(key => `${statusToChar(obj.status)} ${key}: ${obj[key]}\n`);
  return `{\n${result.join('')}}`;
};

const diffToString = (arrDiffObj: [any]) => {
  const result = arrDiffObj.map((key) => {
    if (key.status === 'object') {
      return `${statusToChar(key.status)} ${key.name}: ${diffToString(key.data)}\n`;
    }
    if (typeof key.data === 'object') {
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
  const [head, ...tail] = [...coll];
  switch (head) {
    case '{': return iterToPretty(indent + 4, [...acc, head], tail);
    case '}': return iterToPretty(indent - 4, [...acc, getIndent(indent - 2), head], tail);
    case '\n':
      if (tail[0] !== '}') {
        return iterToPretty(indent, [...acc, head, getIndent(indent)], tail);
      }
      break;
    default: break;
  }
  return iterToPretty(indent, [...acc, head], tail);
};

const toPretty = (stringDiff: string) => {
  const stringDifftoArr = stringDiff.split('');
  return iterToPretty(-4, [], stringDifftoArr).join('');
};

export default (diff: [any]) => toPretty(diffToString(prepareDiff(diff)));
