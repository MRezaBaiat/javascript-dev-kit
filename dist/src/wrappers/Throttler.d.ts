/**
 * policy 'drop' just ignores the function was recently ran ,
 * but 'replace' will replace the latest function fed with the old one and will schedule
 */
declare const throttle: (key: string, interval: number, options: {
    policy: 'replace' | 'drop';
}, fnc: () => void) => void;
export { throttle };
