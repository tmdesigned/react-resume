export const filterByKeys = (obj, allowedKeys) => {
  return Object.keys(obj)
    .filter((key) => allowedKeys.includes(key))
    .reduce((acc, cur) => {
      if (!!obj[cur]) {
        acc[cur] = obj[cur];
      }
      return acc;
    }, {});
};

export const escapeRegExp = (string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
