"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCommonValues = exports.splitArrayToChunks = void 0;
const lodash_1 = __importDefault(require("lodash"));
const toObject = (array, cb) => {
    return array.reduce((accumulator, currentValue) => {
        const val = cb(currentValue, currentValue);
        if (val) {
            accumulator[val.key] = val.value;
        }
        return accumulator;
    }, {});
};
const splitArrayToChunks = (array, maxSize) => {
    if (array.length <= maxSize) {
        return [array];
    }
    const res = [];
    const arr = [...array];
    while (arr.length > maxSize) {
        const cut = arr.splice(0, maxSize);
        res.push(cut);
    }
    return [...res, arr];
};
exports.splitArrayToChunks = splitArrayToChunks;
const findCommonValues = (array, comparator) => {
    return comparator
        ? lodash_1.default.intersectionWith(array, comparator)
        : lodash_1.default.intersection(array);
};
exports.findCommonValues = findCommonValues;
exports.default = {
    splitArrayToChunks,
    findCommonValues,
    toObject
};
