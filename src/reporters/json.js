// @flow

const toJson = (diff) => diff.reduce((acc, {
  name, status, children, value, oldValue,
}) => (status === 'object'
  ? { ...acc, [name]: toJson(children) }
  : { ...acc, [name]: { status, value, oldValue } }
), {});

export default (diff) => JSON.stringify(toJson(diff), null, 2);
