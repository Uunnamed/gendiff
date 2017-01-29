// @flow
const isObject = obj => (Object.prototype.toString.call(obj) === '[object Object]');

const genPlainEnd = (arrDiffObj: [any], key = '') =>
  arrDiffObj.map((obj) => {
    const parentKey = key === '' ? '' : `${key}.`;
    if (obj.status === 'object') {
      return `${parentKey}${genPlainEnd(obj.data, obj.name)}`;
    }
    if (obj.status === 'updated') {
      return `${parentKey}${obj.name}' was updated. From '${obj.data[0]}' to '${obj.data[1]}'`;
    }
    if (obj.status === 'removed') {
      return `${parentKey}${obj.name}' was removed`;
    }
    if (obj.status === 'added') {
      return `${parentKey}${obj.name}' was added with ${isObject(obj.data) ? 'complex value' : `value: ${obj.data}`}`;
    }
    return '';
  }).filter(e => !!e).join('\n');

export default (arrDiffObj: [any]) => genPlainEnd(arrDiffObj, '').split('\n').map(e => `Property '${e}`).join('\n');
