import _ from 'lodash';

const defaultIndent = 4;
const statusToChar = (status) => {
  switch (status) {
    case 'added': return '+';
    case 'removed': return '-';
    default: return ' ';
  }
};

const getIndent = (count) => _.repeat(' ', count);

const objToStr = (obj) => {
  const result = Object.keys(obj).map((key) => `${statusToChar(obj.status)} ${key}: ${obj[key]}\n`);
  return `{\n${result.join('')}}`;
};

const diffToString = (arrDiffObj) => {
  const result = arrDiffObj.map(({
    name, status, children, value,
  }) => {
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

const prepareDiff = (arrDiffObj, { diffOnly }) => _.flatten(arrDiffObj.map(({
  name, status, value, oldValue, children,
}) => {
  if (status === 'object') {
    const newChildren = prepareDiff(children, { diffOnly });
    return _.isEmpty(newChildren) ? {} : { name, status, children: newChildren };
  }
  if (status === 'updated') {
    return [{ name, status: 'added', value },
      { name, status: 'removed', value: oldValue }];
  }
  if (diffOnly && status === 'no_changed') {
    return {};
  }
  return {
    name, status, value, oldValue, children,
  };
})).filter((e) => !_.isEmpty(e));

const toPretty = (stringDiff) => {
  let result = '';
  let indent = -defaultIndent;
  [...stringDiff].forEach((char, i) => {
    const nxtRes = `${result}${char}`;
    switch (char) {
      case '{': indent += defaultIndent; result = nxtRes; break;
      case '}': result = `${result}\n${getIndent(indent - 2)}${char}`; indent -= defaultIndent; break;
      case '\n':
        if (stringDiff[i + 1] !== '}') {
          result = `${nxtRes}${getIndent(indent)}`;
        }
        break;
      default: result = nxtRes; break;
    }
  });
  return result;
};

export default (diff, conf) => prepareDiff(diff, conf) |> diffToString |> toPretty;
