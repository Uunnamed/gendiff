// @flow
import path0 from 'path';
import fs from 'fs';
import compare from './compare';

const supportExtentions = ['json', 'yaml', 'ini'];
const getType = path => path0.extname(path).slice(1);

const check = (...paths) => {
  const checkFiles = paths.reduce((result, path) => {
    if (!fs.existsSync(path)) {
      return `${result}file on path ${path} not found\n`;
    }
    return result;
  }, '');
  if (checkFiles !== '') {
    return checkFiles;
  }
  const [type, type2] = paths.map(getType);
  if (type !== type2) {
    return 'Extension of files must be the same';
  } else if (!supportExtentions.includes(type)) {
    return `Not possible compare files with extension .${type}\nUse only .json or .yaml or .ini`;
  }
  return '';
};

const getDiff = (path1: string, path2: string) => {
  const resultCheck = check(path1, path2);
  if (resultCheck !== '') {
    return resultCheck;
  }
  const [file1, file2] = [path1, path2].map(path => fs.readFileSync(path, 'utf-8'));
  const type = getType(path1);
  return compare(type, file1, file2);
};

export default getDiff;
