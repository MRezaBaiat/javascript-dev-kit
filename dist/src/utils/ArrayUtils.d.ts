declare const splitArrayToChunks: (array: any[], maxSize: number) => any[][];
declare const findCommonValues: <T>(array: T[], comparator?: ((a: T, b: T) => boolean) | undefined) => T[];
export { splitArrayToChunks, findCommonValues };
declare const _default: {
    splitArrayToChunks: (array: any[], maxSize: number) => any[][];
    findCommonValues: <T>(array: T[], comparator?: ((a: T, b: T) => boolean) | undefined) => T[];
    toObject: <T_1 extends any[]>(array: T_1, cb: (value: T_1[number], createdObject: object) => {
        key: string | number;
        value: any;
    }) => object;
};
export default _default;
