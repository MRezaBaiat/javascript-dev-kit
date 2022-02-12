"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    if (!Number.prototype.gt ||
        !Number.prototype.gte ||
        !Number.prototype.lt ||
        !Number.prototype.lte ||
        !Number.prototype.eq) {
        Number.gt = function (is, than) {
            return is > than;
        };
        Number.gte = function (is, than) {
            return is >= than;
        };
        Number.lt = function (is, than) {
            return is < than;
        };
        Number.lte = function (is, than) {
            return is <= than;
        };
        Number.eq = function (is, to) {
            return is === to;
        };
        Number.prototype.gt = function (than) {
            return Number.gt(this, than);
        };
        Number.prototype.gte = function (than) {
            return Number.gte(this, than);
        };
        Number.prototype.lt = function (than) {
            return Number.lt(this, than);
        };
        Number.prototype.lte = function (than) {
            return Number.lte(this, than);
        };
        Number.prototype.eq = function (to) {
            return Number.eq(this, to);
        };
    }
};
