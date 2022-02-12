"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDate = exports.JobManager = exports.Gateway = exports.throttle = exports.DayId = exports.smartDate = exports.UniqueKeyArray = exports.Days = void 0;
require("./src/polyfills/polyfills");
var Days_1 = require("./src/constants/Days");
Object.defineProperty(exports, "Days", { enumerable: true, get: function () { return __importDefault(Days_1).default; } });
const Enums_1 = require("./src/constants/Enums");
Object.defineProperty(exports, "DayId", { enumerable: true, get: function () { return Enums_1.DayId; } });
const utils_1 = __importDefault(require("./src/utils/utils"));
const SmartDate_1 = require("./src/wrappers/SmartDate");
Object.defineProperty(exports, "SmartDate", { enumerable: true, get: function () { return SmartDate_1.SmartDate; } });
const Gateway_1 = __importDefault(require("./src/wrappers/network_gateway/Gateway"));
exports.Gateway = Gateway_1.default;
const Throttler_1 = require("./src/wrappers/Throttler");
Object.defineProperty(exports, "throttle", { enumerable: true, get: function () { return Throttler_1.throttle; } });
const UniqueKeyArray_1 = __importDefault(require("./src/UniqueKeyArray"));
exports.UniqueKeyArray = UniqueKeyArray_1.default;
const JobManager = __importStar(require("./src/wrappers/JobManager"));
exports.JobManager = JobManager;
var Kit;
(function (Kit) {
    Kit.utils = utils_1.default;
})(Kit || (Kit = {}));
// TODO
// job queue
/* namespace O{
// also one way
    export const Utils = Utils;
};

const S = Kit && O; */
Object.assign(Kit, utils_1.default);
exports.default = Kit;
// export = Kit;
require('./src/wrappers/SmartDate'); // dont move to top
// export = Kit;
