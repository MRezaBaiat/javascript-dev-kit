"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const runAsync = (fnc) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(fnc());
        }
        catch (e) {
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
const isNumber = (value) => {
    if (value === null || value === undefined) {
        return false;
    }
    if (typeof value === 'string') {
        return !isNaN(Number(value));
    }
    return lodash_1.default.isFinite(value);
};
const isVoid = (what) => {
    return (what === undefined ||
        what === null ||
        (typeof what === 'number' && isNaN(what)));
};
const isNotVoid = (what) => {
    return !isVoid(what);
};
const isEqual = (object, what) => {
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
        return lodash_1.default.isEqual(object, what);
    }
    return false;
};
const hasConditions = (object, ...conditions) => {
    if (!conditions || conditions.length === 0) {
        return true;
    }
    for (const cond of conditions) {
        if (typeof cond === 'function') {
            if (!cond(object)) {
                return false;
            }
        }
        else if (typeof cond === 'object') {
            const key = Object.keys(cond)[0];
            const value = cond[key];
            //! _.isMatch(Object.deepValue(object, key), value)
            if (!isEqual(Object.deepValue(object, key), value)) {
                return false;
            }
        }
        else {
            return Boolean(cond);
        }
    }
    return true;
};
const isAsync = (promise) => {
    return !!promise && (typeof promise.then === 'function' || promise.constructor.name === 'AsyncFunction');
};
const defaults = (value, defaultValue) => {
    return lodash_1.default.defaults(value, defaultValue);
};
const defaultsDeep = (value, defaultValue) => {
    return lodash_1.default.defaultsDeep(value, defaultValue);
};
const isError = (error) => {
    // @ts-ignore
    return lodash_1.default.isNativeError(error);
};
/* const memoize = ()=>{
  return _.memoize;
}; */
exports.default = {
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
