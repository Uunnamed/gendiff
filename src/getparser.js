import yaml from 'js-yaml';
import ini from 'ini';

const parsers = new Map();

const jsonParser = file => JSON.parse(file);
const yamlParser = file => yaml.safeLoad(file);
const iniParser = file => ini.parse(file);

const setParsers = () => {
  parsers.set('json', jsonParser);
  parsers.set('yaml', yamlParser);
  parsers.set('ini', iniParser);
};

const getParser = (type) => {
  setParsers();
  return parsers.get(type);
};

export default getParser;
