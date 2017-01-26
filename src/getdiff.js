// @flow
import path0 from 'path';
import fs from 'fs';
import compare from './compare';

const supportExtentions = ['.json', '.yaml', '.ini'];

const getContents = path => fs.readFileSync(path, 'utf-8');

const validate = (...paths) => {
  const result = new Map();
  const [ext, ext2] = paths.map(path0.extname);
  if (ext !== ext2) {
    result.set('err', true);
    result.set('message', 'Extension of files must be the same');
  } else if (!supportExtentions.includes(ext)) {
    result.set('err', true);
    result.set('message', `Not possible compare files with extension ${ext}\nUse only .json or .yaml or .ini`);
  } else {
    result.set('err', false);
    result.set('extension', ext.slice(1));
    result.set('files', paths.map(getContents));
  }
  return result;
};

const getDiff = (path1: string, path2: string) => {
  const result = validate(path1, path2);
  return result.get('err')
    ? result.get('message')
    : compare(result.get('extension'), ...result.get('files'));
};

export default getDiff;
