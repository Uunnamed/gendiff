// @flow
import * as fs from 'fs';

export default (...paths) => paths.map(path => fs.readFileSync(path, 'utf-8'));
