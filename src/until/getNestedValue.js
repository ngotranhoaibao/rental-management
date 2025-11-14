export const getNestedValue = (item, path) => {
  return path.split('.').reduce((acc, part) => acc?.[part], item);
};