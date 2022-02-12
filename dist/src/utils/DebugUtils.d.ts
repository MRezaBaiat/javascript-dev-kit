/**
 * TIP:
 * please note when you are testing function usages ,
 * the first usage could be misdirecting due to the app's memory
 * growing for loading new stuff.
 * so try to warm up all unloaded files and then track memory usage
 * probably on the second usage of the function to get the correct results
 */
export declare class MemoryTracker {
    private start;
    startRecording: () => this;
    getUsageReport: () => {
        heapUsage: number;
        duration: string;
        memoryAtBeginning: any;
        memoryAtEnding: any;
    };
    printMemoryDump: () => this;
    printHeapUsage: () => Promise<this>;
}
declare const _default: {
    getMemoryUsage: () => Promise<{
        rss: number;
        heapTotal: number;
        heapUsed: number;
        external: number;
        arrayBuffers: number;
        osFreeMemory: number;
        osTotalMemory: number;
        osUsedMemory: number;
    }>;
    printMemoryUsage: () => void;
    createMemoryTracker: () => MemoryTracker;
    isRunningOnNode: () => boolean;
};
export default _default;
