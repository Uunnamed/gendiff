const genPlainEnd = (arrDiffObj, key = '') => arrDiffObj.map(({
  name, status, value, oldValue, children,
}) => {
  const parentKey = key === '' ? '' : `${key}.`;
  switch (status) {
    case 'object': return `${parentKey}${genPlainEnd(children, name)}`;
    case 'updated': return `${parentKey}${name}' was updated. From '${oldValue}' to '${value}'`;
    case 'removed': return `${parentKey}${name}' was removed`;
    case 'added': return `${parentKey}${name}' was added with ${typeof value === 'object' ? 'complex value' : `value: ${value}`}`;
    default: return '';
  }
}).filter((e) => !!e).join('\n');

export default (arrDiffObj) => genPlainEnd(arrDiffObj, '').split('\n').map((e) => `Property '${e}`).join('\n');
