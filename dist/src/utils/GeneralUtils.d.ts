declare const _default: {
    runAsync: (fnc: Function) => Promise<any>;
    isNumber: (value?: any) => boolean;
    isVoid: (what: any) => boolean;
    isNotVoid: (what: any) => boolean;
    isEqual: (object: string | number | boolean | object | null | undefined, what: string | number | boolean | object | Function | null | undefined) => any;
    hasConditions: (object: any, ...conditions: (boolean | Function | {
        [p: string]: string | number | boolean | object | Function | null | undefined;
    })[]) => boolean;
    defaults: <T>(value: T, defaultValue: T) => T;
    defaultsDeep: <T_1>(value: T_1, defaultValue: T_1) => T_1;
    isError: (error: any) => any;
    isAsync: (promise: any) => boolean;
};
export default _default;
