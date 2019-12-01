// @flow
import _ from 'lodash';
import getParser from './getparser';

const diff = (before, after) => {
  const keys = _.union([..._.keys(before), ..._.keys(after)]);
  return keys.map((key) => {
    if (typeof before[key] === 'object' && typeof after[key] === 'object') {
      return { name: key, status: 'object', children: diff(before[key], after[key]) };
    }
    if (before[key] === after[key]) {
      return { name: key, status: 'no_changed', value: before[key] };
    }
    if (before[key] && after[key]) {
      return {
        name: key, status: 'updated', oldValue: before[key], value: after[key],
      };
    }
    if (after[key]) {
      return { name: key, status: 'added', value: after[key] };
    }
    if (before[key]) {
      return { name: key, status: 'removed', value: before[key] };
    }
    return {};
  });
};

const filterDiffOnly = (arrDiffObj) => arrDiffObj.map(({
  name, status, children, value, oldValue,
}) => {
  if (status === 'object') {
    const newChildren = filterDiffOnly(children);
    return _.isEmpty(newChildren) ? {} : {
      name, status, children: newChildren, value, oldValue,
    };
  }
  if (status === 'no_changed') {
    return {};
  }
  return {
    name, status, children, value, oldValue,
  };
}).filter((e) => !_.isEmpty(e));

export default (type, file1, file2, { diffOnly }) => {
  const parse = getParser(type);
  const [before, after] = [file1, file2].map(parse);
  const arrDiffObj = diff(before, after);
  return diffOnly ? filterDiffOnly(arrDiffObj) : arrDiffObj;
};
