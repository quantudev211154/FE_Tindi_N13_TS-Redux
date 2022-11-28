export const getExactTypeOfObject = (object: Object): string => {
  return Object.prototype.toString.call(object).split(' ')[1].slice(0, -1)
}
