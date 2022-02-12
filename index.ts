import './src/polyfills/polyfills';
export { default as Days } from './src/constants/Days';
import { DayId } from './src/constants/Enums';
import UtilsBundle from './src/utils/utils';
import { SmartDate } from './src/wrappers/SmartDate';
import Gateway from './src/wrappers/network_gateway/Gateway';
import { throttle } from './src/wrappers/Throttler';
import moment from 'jalali-moment';
import UniqueKeyArray from './src/UniqueKeyArray';
import * as JobManager from './src/wrappers/JobManager';

declare function smartDate(): SmartDate;
declare function smartDate(date?: DateInputTypes | boolean): SmartDate;
declare function smartDate(resetMilliseconds? : boolean): SmartDate;
declare function smartDate(date: DateInputTypes, resetMilliseconds? : boolean): SmartDate;
declare class smartDate {
  public static now(): number;
  public static setDefaultTimeZone (tz: string);
}

export {
  UniqueKeyArray,
  smartDate,
  DayId,
  throttle,
  Gateway,
  JobManager,
  SmartDate
};

export interface Day {
    id: DayId;
    name: { fa: string; en: string };
}

// export const smartDate = SMD;

export type KeysOf<K, V> = {
    [P in keyof K]: V;
};
// etc Without<Document<User>, '_id'>
export type ExcludeKey<T, K extends string | string[]> = {
    [L in Exclude<keyof T, K extends string ? K : K[number]>]: T[L];
};
export type ValuesOf<T extends string[]>= T[number];

export type CombinedArrays<T extends any[], E extends any[]> = [...T, ...E]

export type YYYYMMDDHHmm = string;
export type YYYYMMDDHH = string;
export type YYYYMMDD = string;
export type HHmm = string;

export type DateInputTypes =
    | moment.Moment
    | Date
    | SmartDate
    | string
    | number;

namespace Kit {
   export const utils = UtilsBundle;
}

// TODO
// job queue

/* namespace O{
// also one way
    export const Utils = Utils;
};

const S = Kit && O; */

Object.assign(Kit, UtilsBundle);

export default Kit as typeof Kit & typeof UtilsBundle;
// export = Kit;

require('./src/wrappers/SmartDate'); // dont move to top

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
        // toObject(cb: (value: T, createdObject: object)=> { key: string | number, value: any}): object;
        forEachRight(cb: (value: T, index: number, array: T[]) => void): void;
        mapRight<U>(cb: (value: T, index: number, array: T[]) => U): U[];
    }
}

declare global {
    interface ObjectConstructor {
        deepKeyValues(object: any, prefix?: string): { [key: string]: any }[];
        deepValue(object: any, keyPath: string): any;
        setDeepValue<T>(object: any, keyPath: string, value: any): T;
        updateDeepValue<T>(
            object: any,
            keyPath: string,
            updater: (value: any) => any
        ): T;
        isEmpty(object?: any): boolean;
        clone<T>(object: any, customizer?: (value: any) => any): T;
        assignMerge<T, U>(target: T, source: U): T & U;
    }
}

declare global {
    interface String {
        replaceAll(str: string, replacement: string, ignore?: boolean): string;
        replaceWithCondition(
            fnc: (char: string, index: number, stringValue: string) => string | void
        ): string;
        replaceAt(index: number, replacement: string): string;
        truncate(atLength: number, replacement?: '...' | string);
    }
}

// export = Kit;
