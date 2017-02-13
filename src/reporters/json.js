// @flow

const toJson = (diff: [any]) =>
  diff.reduce((acc, { name, status, children, value, oldValue }) =>
    (status === 'object'
    ? { ...acc, [name]: toJson(children) }
    : { ...acc, [name]: { status, value, oldValue } }
    ), {});

export default (diff: [any]) => JSON.stringify(toJson(diff), null, 2);
