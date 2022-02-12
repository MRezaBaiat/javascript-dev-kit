"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
exports.default = () => {
    if (!Array.prototype.replaceIndex) {
        Array.prototype.replaceIndex = function (index, replacement, nearestIndex = false) {
            if (nearestIndex || (index >= 0 && index < this.length)) {
                this[Math.min(Math.max(this.length - 1, 0), Math.max(index, 0))] = replacement;
            }
            return this;
        };
    }
    if (!Array.prototype.replace) {
        Array.prototype.replace = function (object, replacement) {
            return this.replaceIndex(this.indexOf(object), replacement);
        };
    }
    if (!Array.prototype.countMatches) {
        Array.prototype.countMatches = function (fnc) {
            return this.sum((value) => (fnc(value) ? 1 : 0), 0);
        };
    }
    if (!Array.prototype.sum) {
        Array.prototype.sum = function (fnc, initialValue = 0) {
            return this.reduce((total, item) => {
                return total + fnc(item);
            }, initialValue);
        };
    }
    if (!Array.prototype.pushUnique) {
        Array.prototype.pushUnique = function (value) {
            !this.includes(value) && this.push(value);
        };
    }
    if (!Array.prototype.removeValue) {
        Array.prototype.removeValue = function (value) {
            const index = this.indexOf(value);
            const removed = index >= 0 && this.splice(index, 1);
            return this;
        };
    }
    if (!Array.prototype.compact) {
        Array.prototype.compact = function (calculator = (value) => Boolean(value)) {
            return this.filter(calculator);
        };
    }
    if (!Array.prototype.uniquifyWith) {
        Array.prototype.uniquifyWith = function (comparator) {
            if (comparator.length === 1) {
                return this.uniquifyWith((a, b) => {
                    // @ts-ignore
                    return comparator(a) === comparator(b);
                });
            }
            else {
                return this.reduce((total, item) => {
                    const match = total.find((i) => comparator(i, item) && i);
                    if (!match) {
                        total.push(item);
                    }
                    return total;
                }, []);
            }
            /* return _.uniqWith(this, (a,b)=>{
              return a.key === b.key;
            });
             */
        };
    }
    if (!Array.prototype.uniquify) {
        Array.prototype.uniquify = function (deepObjectCompare = false) {
            if (deepObjectCompare) {
                return this.uniquifyWith(lodash_1.default.isEqual);
            }
            else {
                return [...new Set(this)];
                // return this.filter((value, index, self) => self.indexOf(value) === index);
            }
        };
    }
    if (!Array.prototype.swapValueIndexes) {
        Array.prototype.swapValueIndexes = function (obj1, obj2) {
            const index1 = this.indexOf(obj1);
            const index2 = this.indexOf(obj2);
            if (index1 >= 0 && index2 >= 0) {
                this[index1] = obj2;
                this[index2] = obj1;
                return true;
            }
            return false;
        };
    }
    if (!Array.prototype.forEachRight) {
        Array.prototype.forEachRight = function (cb) {
            return lodash_1.default.forEachRight(this, cb);
        };
    }
    if (!Array.prototype.mapRight) {
        Array.prototype.mapRight = function (cb) {
            const total = [];
            lodash_1.default.forEachRight(this, (value, index, arr) => {
                total.push(cb(value, index, arr));
            });
            return total;
        };
    }
};
