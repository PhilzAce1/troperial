export const getStack = (arr) => {
  if (!Array.isArray(arr)) return 'Not an Array';
  if (arr.length < 1) return 1;

  const currentHighest = arr.reduce((a, b) => {
    return Math.max(a, b);
  }, 0);
  return currentHighest + 1;
};

export const removeStack = (arr, ...value) => {
  if (!Array.isArray(arr)) return 'Not an Array';
  if (arr.length < 1) return 1;
  if (!value) return arr;
  return arr.filter((x) => !value.includes(x));
};
