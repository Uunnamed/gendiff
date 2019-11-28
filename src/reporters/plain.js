// @flow

const genPlainEnd = (arrDiffObj, key = '') => arrDiffObj.map(({
  name, status, value, oldValue, children,
}) => {
  const parentKey = key === '' ? '' : `${key}.`;
  if (status === 'object') {
    return `${parentKey}${genPlainEnd(children, name)}`;
  }
  if (status === 'updated') {
    return `${parentKey}${name}' was updated. From '${oldValue}' to '${value}'`;
  }
  if (status === 'removed') {
    return `${parentKey}${name}' was removed`;
  }
  if (status === 'added') {
    return `${parentKey}${name}' was added with ${typeof value === 'object' ? 'complex value' : `value: ${value}`}`;
  }
  return '';
}).filter((e) => !!e).join('\n');

export default (arrDiffObj) => genPlainEnd(arrDiffObj, '').split('\n').map((e) => `Property '${e}`).join('\n');
