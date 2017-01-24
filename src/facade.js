// @flow
import * as path from 'path';
import compareJSON from './compareJSON';

const facade = (path1: string, path2: string) => {
  const ext1 = path.extname(path1);
  const ext2 = path.extname(path2);
  if (ext1 !== ext2) {
    return 'Extension of files must be the same';
  }
  switch (ext1) {
    case '.json': return compareJSON(path1, path2);
    case '.yaml': break;
    case '.ini': break;
    default: break;
  }
  return `Not possible compare files with extension ${ext1}\nUse only .json or .yaml or .ini`;
};

export default facade;
