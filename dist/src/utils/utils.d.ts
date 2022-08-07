declare const _default: {
    splitArrayToChunks: (array: any[], maxSize: number) => any[][];
    findCommonValues: <T>(array: T[], comparator?: ((a: T, b: T) => boolean) | undefined) => T[];
    toObject: <T_1 extends any[]>(array: T_1, cb: (value: T_1[number], createdObject: object) => {
        key: string | number;
        value: any;
    }) => object;
    isDateWithin: (from: import("../..").DateInputTypes, middle: import("../..").DateInputTypes, to: import("../..").DateInputTypes, offset?: number, options?: {
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
    createMemoryTracker: () => import("./DebugUtils").MemoryTracker;
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
