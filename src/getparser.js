import yaml from 'js-yaml';

const parsers = new Map();

const jsonParser = file => JSON.parse(file);
const yamlParser = file => yaml.safeLoad(file);

const setParsers = () => {
  parsers.set('json', jsonParser);
  parsers.set('yaml', yamlParser);
};

const getParser = (type) => {
  setParsers();
  return parsers.get(type);
};

export default getParser;
