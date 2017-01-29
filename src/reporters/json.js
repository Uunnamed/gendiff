// @flow

const prepareDiff = (diff: [any]) =>
  diff.reduce((acc, key) => {
    switch (key.status) {
      case 'object': return { ...acc, [key.name]: prepareDiff(key.data) };
      case 'updated': return { ...acc, [key.name]: { status: key.status, oldVal: key.data[0], newVal: key.data[1] } };
      case 'no_changed': return { ...acc, [key.name]: { status: key.status, newVal: key.data } };
      case 'added': return { ...acc, [key.name]: { status: key.status, newVal: key.data } };
      case 'removed': return { ...acc, [key.name]: { status: key.status, oldVal: key.data } };
      default: break;
    }
    return acc;
  }, {});

export default (diff: [any]) => JSON.stringify(prepareDiff(diff), null, 2);
