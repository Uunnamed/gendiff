// @flow
import path from 'path';
import fs from 'fs';
import compare from './compare';

const supportExtentions = ['.json', '.yaml', '.ini'];

const getContents = (...paths) => paths.map(pathf => fs.readFileSync(pathf, 'utf-8'));

const getDiff = (path1: string, path2: string) => {
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);
  if (ext1 !== ext2) {
    return 'Extension of files must be the same';
  } else if (!supportExtentions.includes(ext1)) {
    return `Not possible compare files with extension ${ext1}\nUse only .json or .yaml or .ini`;
  }
  const [file1, file2] = getContents(path1, path2);
  const type = ext1.slice(1);
  return compare(file1, file2, type);
};

export default getDiff;
