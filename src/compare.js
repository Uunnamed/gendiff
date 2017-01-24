// @flow

const compare = (before: Object, after: Object) => {
  const keys = new Set();
  const result = {};
  [before, after].map(file => Object.keys(file).map(key => keys.add(key)));
  keys.forEach((key) => {
    if (before[key] === after[key]) {
      result[`  ${key}`] = before[key];
    } else {
      if (after[key]) {
        result[`+ ${key}`] = after[key];
      }
      if (before[key]) {
        result[`- ${key}`] = before[key];
      }
    }
  });
  return result;
};

export default compare;
