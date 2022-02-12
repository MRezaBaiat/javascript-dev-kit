import './src/polyfills/polyfills';
export { default as Days } from './src/constants/Days';
import { DayId } from './src/constants/Enums';
import { SmartDate } from './src/wrappers/SmartDate';
import Gateway from './src/wrappers/network_gateway/Gateway';
import { throttle } from './src/wrappers/Throttler';
import moment from 'jalali-moment';
import UniqueKeyArray from './src/UniqueKeyArray';
import * as JobManager from './src/wrappers/JobManager';
declare function smartDate(): SmartDate;
declare function smartDate(date?: DateInputTypes | boolean): SmartDate;
declare function smartDate(resetMilliseconds?: boolean): SmartDate;
declare function smartDate(date: DateInputTypes, resetMilliseconds?: boolean): SmartDate;
declare class smartDate {
    static now(): number;
    static setDefaultTimeZone(tz: string): any;
}
export { UniqueKeyArray, smartDate, DayId, throttle, Gateway, JobManager, SmartDate };
export interface Day {
    id: DayId;
    name: {
        fa: string;
        en: string;
    };
}
export declare type KeysOf<K, V> = {
    [P in keyof K]: V;
};
export declare type ExcludeKey<T, K extends string | string[]> = {
    [L in Exclude<keyof T, K extends string ? K : K[number]>]: T[L];
};
export declare type ValuesOf<T extends string[]> = T[number];
export declare type CombinedArrays<T extends any[], E extends any[]> = [...T, ...E];
export declare type YYYYMMDDHHmm = string;
export declare type YYYYMMDDHH = string;
export declare type YYYYMMDD = string;
export declare type HHmm = string;
export declare type DateInputTypes = moment.Moment | Date | SmartDate | string | number;
declare namespace Kit {
    const utils: {
        splitArrayToChunks: (array: any[], maxSize: number) => any[][];
        findCommonValues: <T>(array: T[], comparator?: ((a: T, b: T) => boolean) | undefined) => T[];
        toObject: <T_1 extends any[]>(array: T_1, cb: (value: T_1[number], createdObject: object) => {
            key: string | number;
            value: any;
        }) => object;
        isDateWithin: (from: DateInputTypes, middle: DateInputTypes, to: DateInputTypes, offset?: number, options?: {
            ltComparator: (from: number, to: number) => boolean;
            gtComparator: (from: number, to: number) => boolean;
        }) => boolean;
        datesRangesConflict: (mDate: {
            from: number;
            to: number;
        }, conflicts: {
            from: number;
            to: number;
        }[], conflictTolerance?: number) => {
            from: number;
            to: number;
        } | undefined;
        findDateFormat: (date: string) => string | undefined;
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
        createMemoryTracker: () => import("./src/utils/DebugUtils").MemoryTracker;
        isRunningOnNode: () => boolean;
        initEmail: (email: string) => string | undefined;
        isEmailValid: (email: string) => boolean;
        initFileName: (fileName: string) => string;
        generateNameFromUrl: (url: string) => string;
        getFileName: (path: string) => string;
        getFileExtension: (filename: string) => string;
        runAsync: (fnc: Function) => Promise<any>;
        isNumber: (value?: any) => boolean;
        isVoid: (what: any) => boolean;
        isNotVoid: (what: any) => boolean;
        isEqual: (object: string | number | boolean | object | null | undefined, what: string | number | boolean | object | Function | null | undefined) => any;
        hasConditions: (object: any, ...conditions: (boolean | Function | {
            [p: string]: string | number | boolean | object | Function | null | undefined;
        })[]) => boolean;
        defaults: <T_2>(value: T_2, defaultValue: T_2) => T_2;
        defaultsDeep: <T_3>(value: T_3, defaultValue: T_3) => T_3;
        isError: (error: any) => any;
        isAsync: (promise: any) => boolean;
        convertToEnglishNumber: (input: string) => string;
        convertToPersianNumber: (input: string) => String;
        containsEnglish: (s: string) => boolean;
        numbersToPersian: (str: string) => string;
        numbersToEnglish: (str: string) => string;
        escapeHTML: (str: string | undefined) => string | undefined;
        unescapeHTML: (str: string | undefined) => string | undefined;
        escapeRegex: (str: string | undefined) => string | undefined;
        commaSeparate: (number: any) => any;
        isBase64: (text: string) => boolean;
        generateUUID: () => string;
        isValidMobile: (mobile: string) => boolean;
        initMobileNumber: (mobile: string) => string | undefined;
    };
}
declare const _default: typeof Kit & {
    splitArrayToChunks: (array: any[], maxSize: number) => any[][];
    findCommonValues: <T>(array: T[], comparator?: ((a: T, b: T) => boolean) | undefined) => T[];
    toObject: <T_1 extends any[]>(array: T_1, cb: (value: T_1[number], createdObject: object) => {
        key: string | number;
        value: any;
    }) => object;
    isDateWithin: (from: DateInputTypes, middle: DateInputTypes, to: DateInputTypes, offset?: number, options?: {
        ltComparator: (from: number, to: number) => boolean;
        gtComparator: (from: number, to: number) => boolean;
    }) => boolean;
    datesRangesConflict: (mDate: {
        from: number;
        to: number;
    }, conflicts: {
        from: number;
        to: number;
    }[], conflictTolerance?: number) => {
        from: number;
        to: number;
    } | undefined;
    findDateFormat: (date: string) => string | undefined;
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
    createMemoryTracker: () => import("./src/utils/DebugUtils").MemoryTracker;
    isRunningOnNode: () => boolean;
    initEmail: (email: string) => string | undefined;
    isEmailValid: (email: string) => boolean;
    initFileName: (fileName: string) => string;
    generateNameFromUrl: (url: string) => string;
    getFileName: (path: string) => string;
    getFileExtension: (filename: string) => string;
    runAsync: (fnc: Function) => Promise<any>;
    isNumber: (value?: any) => boolean;
    isVoid: (what: any) => boolean;
    isNotVoid: (what: any) => boolean;
    isEqual: (object: string | number | boolean | object | null | undefined, what: string | number | boolean | object | Function | null | undefined) => any;
    hasConditions: (object: any, ...conditions: (boolean | Function | {
        [p: string]: string | number | boolean | object | Function | null | undefined;
    })[]) => boolean;
    defaults: <T_2>(value: T_2, defaultValue: T_2) => T_2;
    defaultsDeep: <T_3>(value: T_3, defaultValue: T_3) => T_3;
    isError: (error: any) => any;
    isAsync: (promise: any) => boolean;
    convertToEnglishNumber: (input: string) => string;
    convertToPersianNumber: (input: string) => String;
    containsEnglish: (s: string) => boolean;
    numbersToPersian: (str: string) => string;
    numbersToEnglish: (str: string) => string;
    escapeHTML: (str: string | undefined) => string | undefined;
    unescapeHTML: (str: string | undefined) => string | undefined;
    escapeRegex: (str: string | undefined) => string | undefined;
    commaSeparate: (number: any) => any;
    isBase64: (text: string) => boolean;
    generateUUID: () => string;
    isValidMobile: (mobile: string) => boolean;
    initMobileNumber: (mobile: string) => string | undefined;
};
export default _default;
declare global {
    interface Number {
        gt(than: number): boolean;
        gte(than: number): boolean;
        lt(than: number): boolean;
        lte(than: number): boolean;
        eq(to: number): boolean;
    }
    interface NumberConstructor {
        gt(is: number, than: number): boolean;
        gte(is: number, than: number): boolean;
        lt(is: number, than: number): boolean;
        lte(is: number, than: number): boolean;
        eq(is: number, than: number): boolean;
    }
}
declare global {
    interface Array<T> {
        replace(object: T, replacement: T): Array<T>;
        replaceIndex(index: number, replacement: T, nearestIndex?: boolean): Array<T>;
        removeValue(value: T): Array<T>;
        pushUnique(value: T): void;
        countMatches(fnc: (value: T) => boolean): number;
        sum(fnc: (value: T) => number, initialValue?: number): number;
        compact(calculator?: (value: T) => boolean): Array<T>;
        uniquifyWith(comparator: ((a: T, b: T) => boolean) | ((a: T) => string | number)): Array<T>;
        uniquify(deepObjectCompare?: boolean): Array<T>;
        swapValueIndexes(obj1: T, obj2: T): boolean;
        forEachRight(cb: (value: T, index: number, array: T[]) => void): void;
        mapRight<U>(cb: (value: T, index: number, array: T[]) => U): U[];
    }
}
declare global {
    interface ObjectConstructor {
        deepKeyValues(object: any, prefix?: string): {
            [key: string]: any;
        }[];
        deepValue(object: any, keyPath: string): any;
        setDeepValue<T>(object: any, keyPath: string, value: any): T;
        updateDeepValue<T>(object: any, keyPath: string, updater: (value: any) => any): T;
        isEmpty(object?: any): boolean;
        clone<T>(object: any, customizer?: (value: any) => any): T;
        assignMerge<T, U>(target: T, source: U): T & U;
    }
}
declare global {
    interface String {
        replaceAll(str: string, replacement: string, ignore?: boolean): string;
        replaceWithCondition(fnc: (char: string, index: number, stringValue: string) => string | void): string;
        replaceAt(index: number, replacement: string): string;
        truncate(atLength: number, replacement?: '...' | string): any;
    }
}
