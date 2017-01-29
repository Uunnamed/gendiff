import plain from './plain';
import pretty from './pretty';
import json from './json';

const reporters = { plain, pretty, json };

export default (format = 'pretty', diff) => {
  const reporter = reporters[format];
  if (!reporter) {
    throw new Error(`Reporter format "${format}" is not supported.`);
  }
  return reporter(diff);
};
