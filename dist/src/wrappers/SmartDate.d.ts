import moment from 'jalali-moment';
import { DateInputTypes, Day, DayId, YYYYMMDD, YYYYMMDDHH, YYYYMMDDHHmm } from '../../index';
declare class SmartDate {
    private static timeZone;
    private mDate;
    private persianDigits;
    static MAX_ISO_DATE: string;
    static MIN_ISO_DATE: string;
    static setDefaultTimeZone(tz: string): void;
    private setMoment;
    /**
     * @param date any
     * @param resetMilliseconds and input type of string will set the milliseconds to 0
     */
    constructor(date?: DateInputTypes, resetMilliseconds?: boolean);
    usePersianDigits: (persian?: boolean) => this;
    private toNumberDigits;
    formatGregorian: (format?: string) => string;
    formatJalali: (format?: string) => string;
    formatISO(format?: string): string;
    private toLocale;
    private initParam;
    private setGregorianTimeProps;
    private setJalaliTimeProps;
    toBeginningOfDay: () => this;
    toEndOfDay: () => this;
    resetMilliSeconds: () => this;
    setDay: (day: number | string) => this;
    setJDay: (day: number | string) => this;
    setMonth: (month: number | string) => this;
    setJMonth: (month: number | string) => this;
    setYear: (year: number | string) => this;
    setJYear: (year: number | string) => this;
    setHour: (hour: number | string) => this;
    setMinutes: (minutes: number | string) => this;
    setSeconds: (seconds: number | string) => this;
    hour: () => number;
    minutes: () => number;
    seconds: () => number;
    millisecondsOfSecond: () => string;
    getTime: () => number;
    toISOString(): string;
    getTimezoneOffset(): number;
    UTCOffset(): number;
    day: () => number;
    jDay: () => number;
    month: () => number;
    jMonth: () => number;
    year: () => number;
    jYear: () => number;
    dayName: () => DayId;
    jDayName: () => string;
    toDay: () => Day;
    toMoment: () => moment.Moment;
    toYMDHM: () => YYYYMMDDHHmm;
    toYMDH: () => YYYYMMDDHH;
    toYMD: () => YYYYMMDD;
    toHM: () => YYYYMMDDHH;
    add: (amount: number, type: 'year' | 'jYear' | 'month' | 'jMonth' | 'weeks' | 'day' | 'hour' | 'minutes' | 'seconds' | 'milliseconds') => this;
    isSameDate: (date: DateInputTypes, ignoreMilliseconds?: boolean) => boolean;
    isBefore: (date: DateInputTypes) => boolean;
    isAfter: (date: DateInputTypes) => boolean;
    clone: () => SmartDate;
    toString: () => string;
}
declare type SMDClass = SmartDate;
export { SMDClass, SmartDate };
declare module '../../index' {
}
