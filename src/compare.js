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


const compare = (type, file1, file2) => {
  const parse = getParser(type);
  const [before, after] = [file1, file2].map(parse);
  return diff(before, after);
};

export default compare;
