"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayUtils_1 = __importDefault(require("./ArrayUtils"));
const DateUtils_1 = __importDefault(require("./DateUtils"));
const DebugUtils_1 = __importDefault(require("./DebugUtils"));
const EmailUtils_1 = __importDefault(require("./EmailUtils"));
const FileUtils_1 = __importDefault(require("./FileUtils"));
const GeneralUtils_1 = __importDefault(require("./GeneralUtils"));
const LangUtils_1 = __importDefault(require("./LangUtils"));
const StringUtils_1 = __importDefault(require("./StringUtils"));
const UUIDUtils_1 = __importDefault(require("./UUIDUtils"));
const PhoneUtils_1 = __importDefault(require("./PhoneUtils"));
exports.default = {
    ...PhoneUtils_1.default,
    ...UUIDUtils_1.default,
    ...StringUtils_1.default,
    ...LangUtils_1.default,
    ...GeneralUtils_1.default,
    ...FileUtils_1.default,
    ...EmailUtils_1.default,
    ...DebugUtils_1.default,
    ...DateUtils_1.default,
    ...ArrayUtils_1.default
};
