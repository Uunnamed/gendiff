// @flow
import path0 from 'path';
import fs from 'fs';
import compare from './compare';

const supportExtentions = ['json', 'yaml', 'ini'];
const getType = path => path0.extname(path).slice(1);

const check = (path1, path2) => {
  const errorsCheckFiles = [path1, path2].reduce((acc, path) => {
    if (!fs.existsSync(path)) {
      acc.push(`File on path ${path} not found`);
    }
    return acc;
  }, []);
  if (errorsCheckFiles.length !== 0) {
    return [true, errorsCheckFiles.join('\n')];
  }
  const [type, type2] = [path1, path2].map(getType);
  if (type !== type2) {
    return [true, 'Extension of files must be the same'];
  } else if (!supportExtentions.includes(type)) {
    return [true, `Not possible compare files with extension .${type}\nUse only .json or .yaml or .ini`];
  }
  return [false, 'ok'];
};

const getDiff = (path1: string, path2: string) => {
  const [err, message] = check(path1, path2);
  if (err) {
    return message;
  }
  const [file1, file2] = [path1, path2].map(path => fs.readFileSync(path, 'utf-8'));
  const type = getType(path1);
  return compare(type, file1, file2);
};

export default getDiff;
