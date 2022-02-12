"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const GeneralUtils_1 = __importDefault(require("../utils/GeneralUtils"));
exports.default = () => {
    if (!String.prototype.replaceAll) {
        String.prototype.replaceAll = function (str, replacement, ignore) {
            // If a regex pattern
            return this.replace(new RegExp(str.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, '\\$&'), (ignore ? 'gi' : 'g')), (typeof (replacement) === 'string') ? replacement.replace(/\$/g, '$$$$') : replacement);
            /* if (
              Object.prototype.toString.call(str).toLowerCase() === '[object regexp]'
            ) {
              return this.replace(str, replacement);
            }
      
            // If a string
            return this.replace(new RegExp(str, 'g'), replacement); */
        };
    }
    if (!String.prototype.replaceAt) {
        String.prototype.replaceAt = function (index, replacement) {
            return (this.substr(0, index) +
                replacement +
                this.substr(index + replacement.length));
        };
    }
    if (!String.prototype.replaceWithCondition) {
        String.prototype.replaceWithCondition = function (fnc) {
            let str = this;
            for (let i = 0; i < this.length; i++) {
                const replacement = fnc(str.charAt(i), i, str);
                if (!GeneralUtils_1.default.isVoid(replacement) && typeof replacement === 'string') {
                    str = this.replaceAt(i, replacement);
                }
            }
            return str;
        };
    }
    if (!String.prototype.truncate) {
        String.prototype.truncate = function (atLength, replacement = '...') {
            return lodash_1.default.truncate(this, {
                length: atLength + replacement.length,
                omission: replacement
            });
        };
    }
};
