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

export const isValidDate = (date) => date instanceof Date && !isNaN(date);

export const isOverlapping = (r1, r2, overlapPadding) =>
  !(
    r2.x - overlapPadding > r1.x + r1.width + overlapPadding ||
    r2.x + r2.width + overlapPadding < r1.x - overlapPadding ||
    r2.y - overlapPadding > r1.y + r1.height + overlapPadding ||
    r2.y + r2.height + overlapPadding < r1.y - overlapPadding
  );

export const outOfBounds = (bBox, { minX, minY, width, height }) => {
  const val =
    bBox.x < minX ||
    bBox.x + bBox.width > minX + width ||
    bBox.y < minY ||
    bBox.y + bBox.height > minY + height;

  console.log("outofbounds?", bBox, val, minX, minY, width, height);
  return val;
};

export const wiggle = (x, y, iteration) => {
  return {
    x:
      iteration % 2 === 0
        ? x
        : iteration % 4 === 0
        ? x + 5 * iteration
        : x - 5 * iteration,
    y:
      iteration % 2 !== 0
        ? y
        : iteration % 4 !== 0
        ? y + 5 * iteration
        : y - 5 * iteration
  };
};
