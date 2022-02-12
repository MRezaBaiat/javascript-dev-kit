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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryTracker = void 0;
const getMemoryUsage = async () => {
    if (!isRunningOnNode()) {
        throw new Error('you need to be in a nodejs environment');
    }
    throw new Error();
    // eslint-disable-next-line no-unreachable
    return Promise.resolve().then(() => __importStar(require('os'))).then((os) => {
        const report = {
            ...process.memoryUsage(),
            osTotalMemory: os.totalmem(),
            osFreeMemory: os.freemem()
        };
        return {
            ...report,
            osUsedMemory: report.osTotalMemory - report.osFreeMemory
        };
    });
};
const printMemoryUsage = () => {
    const memory = getMemoryUsage();
    Object.keys(memory).forEach((key) => console.log(`${key} ${Math.round((memory[key] / 1024 / 1024) * 100) / 100} MB`));
};
const isRunningOnNode = () => {
    // @ts-ignore
    if (typeof window === 'undefined') {
        return true;
    }
    else {
        return false;
    }
};
/**
 * TIP:
 * please note when you are testing function usages ,
 * the first usage could be misdirecting due to the app's memory
 * growing for loading new stuff.
 * so try to warm up all unloaded files and then track memory usage
 * probably on the second usage of the function to get the correct results
 */
class MemoryTracker {
    constructor() {
        this.startRecording = () => {
            this.start = {
                memory: getMemoryUsage(),
                date: Date.now()
            };
            return this;
        };
        this.getUsageReport = () => {
            const record = {
                duration: (Date.now() - this.start.date) / 1000 + ' seconds',
                memoryAtBeginning: this.start.memory,
                memoryAtEnding: this.start.memory
            };
            return {
                ...record,
                heapUsage: record.memoryAtEnding.heapUsed - record.memoryAtBeginning.heapUsed
            };
        };
        this.printMemoryDump = () => {
            console.log(getMemoryUsage());
            return this;
        };
        this.printHeapUsage = async () => {
            const memUsage = await getMemoryUsage();
            const used = memUsage.heapUsed - this.start.memory.heapUsed;
            console.log(`heap used : ${used} B = ${Math.round(used / 1024)} KB = ${Math.round(used / 1024 / 1024)} MB`);
            return this;
        };
    }
}
exports.MemoryTracker = MemoryTracker;
const createMemoryTracker = () => {
    return new MemoryTracker();
};
exports.default = {
    getMemoryUsage,
    printMemoryUsage,
    createMemoryTracker,
    isRunningOnNode
};
