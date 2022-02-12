"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const isBase64 = (text) => {
    return !!(text && text.match(/^data:/));
};
const commaSeparate = (number) => {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};
const numbersToPersian = (str) => {
    if (!str) {
        return str;
    }
    str = String(str);
    let newValue = '';
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        if (ch >= 48 && ch <= 57) {
            const newChar = ch + 1584;
            newValue = newValue + String.fromCharCode(newChar);
        }
        else {
            newValue = newValue + String.fromCharCode(ch);
        }
    }
    return newValue;
};
const numbersToEnglish = (str) => {
    if (!str) {
        return str;
    }
    str = String(str);
    let e = '۰'.charCodeAt(0);
    // @ts-ignore
    str = str.replace(/[۰-۹]/g, (t) => t.charCodeAt(0) - e);
    e = '٠'.charCodeAt(0);
    // @ts-ignore
    str = str.replace(/[٠-٩]/g, (t) => t.charCodeAt(0) - e);
    return str;
};
const escapeHTML = (str) => {
    if (!str) {
        return str;
    }
    return lodash_1.default.escape(str);
};
const unescapeHTML = (str) => {
    if (!str) {
        return str;
    }
    return lodash_1.default.unescape(str);
};
const escapeRegex = (str) => {
    if (!str) {
        return str;
    }
    return lodash_1.default.escapeRegExp(str);
};
exports.default = {
    numbersToPersian,
    numbersToEnglish,
    escapeHTML,
    unescapeHTML,
    escapeRegex,
    commaSeparate,
    isBase64
};
