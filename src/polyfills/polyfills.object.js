"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = () => {
    if (!Object.deepKeyValues) {
        Object.deepKeyValues = (object, prefix = '') => {
            const keyVals = [];
            Object.keys(object).forEach((key) => {
                keyVals.push({
                    [`${prefix ? prefix + '.' + key : key}`]: object[key]
                });
                if (typeof object[key] === 'object') {
                    const arr = Object.deepKeyValues(object[key], prefix ? prefix + '.' + key : key);
                    arr.length !== 0 && keyVals.push(...arr);
                }
            });
            return keyVals;
        };
    }
    if (!Object.deepValue) {
        Object.deepValue = function (object, keyPath) {
            if (!object) {
                return undefined;
            }
            return lodash_1.default.get(object, keyPath);
            // return keyPath.split('.').reduce((o, i) => o[i], object);
        };
    }
    if (!Object.isEmpty) {
        Object.isEmpty = function (object) {
            return lodash_1.default.isEmpty(object);
        };
    }
    if (!Object.clone) {
        Object.clone = function (object, customizer) {
            return customizer ? lodash_1.default.cloneDeepWith(customizer) : lodash_1.default.cloneDeep(object);
        };
    }
    if (!Object.assignMerge) {
        Object.assignMerge = function (target, source) {
            return lodash_1.default.merge(target, source);
        };
    }
    if (!Object.setDeepValue) {
        Object.setDeepValue = function (object, keyPath, value) {
            return lodash_1.default.set(object, keyPath, value);
        };
    }
    if (!Object.updateDeepValue) {
        Object.updateDeepValue = function (object, keyPath, updater) {
            return lodash_1.default.update(object, keyPath, updater);
        };
    }
};
