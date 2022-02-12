import _ from 'lodash';

const runAsync = (fnc: Function): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(fnc());
    } catch (e) {
      reject(e);
    }
  });
};

/**
 isNumber(undefined) = false
 isNumber(null) = false
 isNumber('some text') = false
 isNumber([]) = false
 isNumber({}) = false
 isNumber('2') = true
 isNumber(2) = true
 */
const isNumber = (value?: any) => {
  if (value === null || value === undefined) {
    return false;
  }
  if (typeof value === 'string') {
    return !isNaN(Number(value));
  }
  return _.isFinite(value);
};

const isVoid = (what: any) => {
  return (
    what === undefined ||
    what === null ||
    (typeof what === 'number' && isNaN(what))
  );
};

const isNotVoid = (what: any) => {
  return !isVoid(what);
};

const isEqual = (object: object | number | string | boolean | null | undefined, what: object | number | string | boolean | null | undefined | Function) => {
  if (object === what) {
    return true;
  }
  if (Boolean(object) !== Boolean(what)) {
    return false;
  }
  if (typeof what === 'function') {
    return what(object);
  }
  if (typeof object !== typeof what) {
    return false;
  }
  if (typeof object === 'object') {
    return _.isEqual(object, what);
  }
  return false;
};

const hasConditions = (object: any, ...conditions: ({ [p: string]: | string | number | Function | boolean | object | undefined | null } | boolean | Function)[]) => {
  if (!conditions || conditions.length === 0) {
    return true;
  }
  for (const cond of conditions) {
    if (typeof cond === 'function') {
      if (!cond(object)) {
        return false;
      }
    } else if (typeof cond === 'object') {
      const key = Object.keys(cond)[0];
      const value = cond[key];
      //! _.isMatch(Object.deepValue(object, key), value)
      if (!isEqual(Object.deepValue(object, key), value)) {
        return false;
      }
    } else {
      return Boolean(cond);
    }
  }

  return true;
};

const isAsync = (promise) => {
  return !!promise && (typeof promise.then === 'function' || promise.constructor.name === 'AsyncFunction');
};

const defaults = <T>(value: T, defaultValue: T): T => {
  return _.defaults(value, defaultValue);
};
const defaultsDeep = <T>(value: T, defaultValue: T): T => {
  return _.defaultsDeep(value, defaultValue);
};

const isError = (error: any) => {
  // @ts-ignore
  return _.isNativeError(error);
};

/* const memoize = ()=>{
  return _.memoize;
}; */

export default {
  runAsync,
  isNumber,
  isVoid,
  isNotVoid,
  isEqual,
  hasConditions,
  defaults,
  defaultsDeep,
  isError,
  isAsync
};
