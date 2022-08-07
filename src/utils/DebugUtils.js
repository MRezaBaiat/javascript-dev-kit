"use strict";
/* const getMemoryUsage = async (): Promise<{
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
  arrayBuffers: number;
  osFreeMemory: number;
  osTotalMemory: number;
  osUsedMemory: number;
}> => {
  if (!isRunningOnNode()) {
    throw new Error('you need to be in a nodejs environment');
  }
  throw new Error();
  // eslint-disable-next-line no-unreachable
  return import('os')
    .then((os) => {
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
}; */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryTracker = void 0;
/* const printMemoryUsage = () => {
  const memory = getMemoryUsage();
  Object.keys(memory).forEach((key) =>
    console.log(
      `${key} ${Math.round((memory[key] / 1024 / 1024) * 100) / 100} MB`
    )
  );
}; */
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
}
exports.MemoryTracker = MemoryTracker;
const createMemoryTracker = () => {
    return new MemoryTracker();
};
exports.default = {
    createMemoryTracker,
    isRunningOnNode
};
