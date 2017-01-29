// @flow
import _ from 'lodash';
import getParser from './getparser';

const diff = (before, after) => {
  const keys = _.union([..._.keys(before), ..._.keys(after)]);
  return keys.map((key) => {
    if (typeof before[key] === 'object' && typeof after[key] === 'object') {
      return { name: key, status: 'object', data: diff(before[key], after[key]) };
    }
    if (before[key] === after[key]) {
      return { name: key, status: 'no_changed', data: before[key] };
    }
    if (before[key] && after[key]) {
      return { name: key, status: 'updated', data: [before[key], after[key]] };
    }
    if (after[key]) {
      return { name: key, status: 'added', data: after[key] };
    }
    if (before[key]) {
      return { name: key, status: 'removed', data: before[key] };
    }
    return {};
  });
};


const compare = (type: string, file1: string, file2: string) => {
  const parse = getParser(type);
  const [before, after] = [file1, file2].map(parse);
  return diff(before, after);
};

export default compare;
