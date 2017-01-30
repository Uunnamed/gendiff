// @flow

const toJson = (diff: [any]) =>
  diff.reduce((acc, obj) => {
    if (obj.status === 'object') {
      return { ...acc, [obj.name]: toJson(obj.children) };
    }
    return { ...acc, [obj.name]: { status: obj.status, value: obj.value, oldValue: obj.oldValue } };
  }, {});

export default (diff: [any]) => JSON.stringify(toJson(diff), null, 2);
