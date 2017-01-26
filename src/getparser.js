import yamlParser from 'js-yaml';

const parsers = new Map();

const json = (...files) => files.map(file => JSON.parse(file));
const yaml = (...files) => files.map(file => yamlParser.safeLoad(file));

const setParsers = () => {
  parsers.set('json', json);
  parsers.set('yaml', yaml);
};

const getParser = (type) => {
  setParsers();
  return parsers.get(type);
};

export default getParser;
