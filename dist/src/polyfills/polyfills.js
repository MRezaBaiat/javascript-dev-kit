"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polyfills_string_1 = __importDefault(require("./polyfills.string"));
const polyfills_array_1 = __importDefault(require("./polyfills.array"));
const polyfills_object_1 = __importDefault(require("./polyfills.object"));
const polyfills_number_1 = __importDefault(require("./polyfills.number"));
polyfills_string_1.default();
polyfills_array_1.default();
polyfills_object_1.default();
polyfills_number_1.default();
exports.default = {};
