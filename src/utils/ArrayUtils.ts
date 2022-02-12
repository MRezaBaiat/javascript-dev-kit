import _ from 'lodash';

const toObject = <T extends any[]>(array: T, cb: (value: T[number], createdObject: object)=> { key: string | number, value: any}): object => {
  return array.reduce((accumulator, currentValue) => {
    const val = cb(currentValue, currentValue);
    if (val) {
      accumulator[val.key] = val.value;
    }
    return accumulator;
  }, {});
};

const splitArrayToChunks = (array: any[], maxSize: number): any[][] => {
  if (array.length <= maxSize) {
    return [array];
  }
  const res: any[][] = [];
  const arr = [...array];
  while (arr.length > maxSize) {
    const cut = arr.splice(0, maxSize);
    res.push(cut);
  }
  return [...res, arr];
};

const findCommonValues = <T>(array: T[], comparator?: (a: T, b: T) => boolean) => {
  return comparator
    ? _.intersectionWith<T>(array, comparator)
    : _.intersection<T>(array);
};

export {
  splitArrayToChunks,
  findCommonValues
};

export default {
  splitArrayToChunks,
  findCommonValues,
  toObject
};
