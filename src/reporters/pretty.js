// @flow
import _ from 'lodash';

const defaultIndent = 4;
const statusToChar = (status) => {
  switch (status) {
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
  const result = arrDiffObj.map(({ name, status, children, value }) => {
    if (status === 'object') {
      return `${statusToChar(status)} ${name}: ${diffToString(children)}\n`;
    }
    if (typeof value === 'object') {
      return `${statusToChar(status)} ${name}: ${objToStr(value)}\n`;
    }
    return `${statusToChar(status)} ${name}: ${value}\n`;
  });
  return `{\n${result.join('')}}`;
};

const prepareDiff = arrDiffObj =>
  _.flatten(arrDiffObj.map(({ name, status, value, oldValue, children }) => {
    if (status === 'object') {
      return { name, status, children: prepareDiff(children) };
    }
    if (status === 'updated') {
      return [{ name, status: 'added', value },
              { name, status: 'removed', value: oldValue }];
    }
    return { name, status, value, oldValue, children };
  }));

const toPretty = (stringDiff: string) => {
  const iter = (indent: number, acc: [any], coll: [any]) => {
    if (!coll.length) {
      return acc;
    }
    const [head, ...tail] = [...coll];
    switch (head) {
      case '{': return iter(indent + defaultIndent, [...acc, head], tail);
      case '}': return iter(indent - defaultIndent, [...acc, getIndent(indent - 2), head], tail);
      case '\n':
        if (_.head(tail) !== '}') {
          return iter(indent, [...acc, head, getIndent(indent)], tail);
        }
        break;
      default: break;
    }
    return iter(indent, [...acc, head], tail);
  };
  return iter(-defaultIndent, [], [...stringDiff]).join('');
};

export default (diff: [any]) => toPretty(diffToString(prepareDiff(diff)));
