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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDate = void 0;
const jalali_moment_1 = __importDefault(require("jalali-moment"));
const index_1 = __importStar(require("../../index"));
const DateUtils_1 = __importDefault(require("../utils/DateUtils"));
const Index = require('../../index');
const TZ_TEHRAN = 'utc+03:30';
const TZ_UTC = 'utc+00:00';
class SmartDate {
    /**
     * @param date any
     * @param resetMilliseconds and input type of string will set the milliseconds to 0
     */
    constructor(date, resetMilliseconds) {
        this.persianDigits = false;
        this.usePersianDigits = (persian = true) => {
            this.persianDigits = persian;
            return this;
        };
        this.toNumberDigits = (value) => {
            return this.persianDigits ? Number(index_1.default.numbersToPersian(String(value))) : Number(value);
        };
        this.formatGregorian = (format = 'YYYY/MM/DD HH:mm') => {
            const formatted = this.toLocale(format, 'en');
            return this.persianDigits ? index_1.default.numbersToPersian(formatted) : formatted;
        };
        this.formatJalali = (format = 'jYYYY/jMM/jDD HH:mm') => {
            const formatted = this.toLocale(format, 'fa');
            return this.persianDigits ? index_1.default.numbersToPersian(formatted) : formatted;
        };
        this.initParam = (value, fallBack) => {
            if (value === null || value === undefined) {
                return fallBack();
            }
            return value;
        };
        this.setGregorianTimeProps = (props) => {
            const { initParam } = this;
            props.year = initParam(props.year, this.year);
            props.month = initParam(props.month, this.month);
            props.day = initParam(props.day, this.day);
            props.hour = initParam(props.hour, this.hour);
            props.minutes = initParam(props.minutes, this.minutes);
            props.seconds = initParam(props.seconds, this.seconds);
            props.mss = initParam(props.mss, this.millisecondsOfSecond);
            const { year, month, day, hour, minutes, seconds, mss } = props;
            this.setMoment(jalali_moment_1.default(`${year}/${month}/${day} ${hour}:${minutes}:${seconds}.${mss}`, 'YYYY/MM/DD HH:mm:ss:SSS'));
            return this;
        };
        this.setJalaliTimeProps = (props) => {
            const { initParam } = this;
            props.year = initParam(props.year, this.jYear);
            props.month = initParam(props.month, this.jMonth);
            props.day = initParam(props.day, this.jDay);
            props.hour = initParam(props.hour, this.hour);
            props.minutes = initParam(props.minutes, this.minutes);
            props.seconds = initParam(props.seconds, this.seconds);
            props.mss = initParam(props.mss, this.millisecondsOfSecond);
            const { year, month, day, hour, minutes, seconds, mss } = props;
            this.setMoment(jalali_moment_1.default(`${year}/${month}/${day} ${hour}:${minutes}:${seconds}.${mss}`, 'jYYYY/jMM/jDD HH:mm:ss:SSS'));
            return this;
        };
        this.toBeginningOfDay = () => {
            return this.setGregorianTimeProps({
                hour: 0,
                minutes: 0,
                seconds: 0,
                mss: 0
            });
        };
        this.toEndOfDay = () => {
            return this.setGregorianTimeProps({
                hour: 23,
                minutes: 59,
                seconds: 59,
                mss: 999
            });
        };
        this.resetMilliSeconds = () => {
            this.mDate.milliseconds(0);
            return this;
        };
        /* public setMilliSeconds = (mss: string) => { // must be SSS
            return this.setGregorianTimeProps({ mss });
          }; */
        this.setDay = (day) => {
            return this.setGregorianTimeProps({ day });
        };
        this.setJDay = (day) => {
            return this.setJalaliTimeProps({ day });
        };
        this.setMonth = (month) => {
            return this.setGregorianTimeProps({ month });
        };
        this.setJMonth = (month) => {
            return this.setJalaliTimeProps({ month });
        };
        this.setYear = (year) => {
            return this.setGregorianTimeProps({ year });
        };
        this.setJYear = (year) => {
            return this.setJalaliTimeProps({ year });
        };
        this.setHour = (hour) => {
            return this.setGregorianTimeProps({ hour });
        };
        this.setMinutes = (minutes) => {
            return this.setGregorianTimeProps({ minutes });
        };
        this.setSeconds = (seconds) => {
            return this.setGregorianTimeProps({ seconds });
        };
        this.hour = () => {
            return this.toNumberDigits(this.toLocale('HH'));
        };
        this.minutes = () => {
            return this.toNumberDigits(this.toLocale('mm'));
        };
        this.seconds = () => {
            return this.toNumberDigits(this.toLocale('ss'));
        };
        this.millisecondsOfSecond = () => {
            return this.toLocale('SSS'); // should not be converted to number or the whole thing will not work correctly
        };
        this.getTime = () => {
            return this.mDate.toDate().getTime();
        };
        this.day = () => {
            return this.toNumberDigits(this.toLocale('DD'));
        };
        this.jDay = () => {
            return this.toNumberDigits(this.toLocale('jDD'));
        };
        this.month = () => {
            return this.toNumberDigits(this.toLocale('MM'));
        };
        this.jMonth = () => {
            return this.toNumberDigits(this.toLocale('jMM'));
        };
        this.year = () => {
            return this.toNumberDigits(this.toLocale('YYYY'));
        };
        this.jYear = () => {
            return this.toNumberDigits(this.toLocale('jYYYY'));
        };
        this.dayName = () => {
            return this.toLocale('dddd').toLowerCase();
        };
        this.jDayName = () => {
            return index_1.Days[this.dayName()].name.fa;
        };
        this.toDay = () => {
            return index_1.Days[this.dayName()];
        };
        this.toMoment = () => {
            return this.mDate;
        };
        this.toYMDHM = () => {
            return this.formatGregorian('YYYY/MM/DD HH:mm');
        };
        this.toYMDH = () => {
            return this.formatGregorian('YYYY/MM/DD HH');
        };
        this.toYMD = () => {
            return this.formatGregorian('YYYY/MM/DD');
        };
        this.toHM = () => {
            return this.formatGregorian('HH:mm');
        };
        this.add = (amount, type) => {
            this.mDate.add(amount, type);
            return this;
        };
        this.isSameDate = (date, ignoreMilliseconds = false) => {
            return (smartDate(this, ignoreMilliseconds).getTime() ===
                smartDate(date, ignoreMilliseconds).getTime());
        };
        this.isBefore = (date) => {
            return this.getTime() < smartDate(date).getTime();
        };
        this.isAfter = (date) => {
            return this.getTime() > smartDate(date).getTime();
        };
        this.clone = () => {
            return smartDate(this.mDate.clone());
        };
        this.toString = () => {
            return this.formatGregorian();
        };
        if (date) {
            if (typeof date === 'number') {
                this.setMoment(jalali_moment_1.default(date));
            }
            else if (typeof date === 'object') {
                // @ts-ignore
                this.setMoment(jalali_moment_1.default(date.mDate ? date.mDate.clone() : jalali_moment_1.default(date)));
            }
            else if (typeof date === 'string') {
                date = index_1.default.numbersToEnglish(date);
                // const format = Kit.findDateFormat(date);
                const format = jalali_moment_1.default(date).creationData().format || DateUtils_1.default.findDateFormat(date);
                if (format) {
                    if (format.toLowerCase().includes('z') && !format.toLowerCase().endsWith('z')) {
                        this.setMoment(jalali_moment_1.default.parseZone(date));
                    }
                    else {
                        this.setMoment(jalali_moment_1.default(date, format));
                    }
                    if (resetMilliseconds === undefined ||
                        resetMilliseconds === null ||
                        resetMilliseconds) {
                        !format.includes('SSS') && this.resetMilliSeconds();
                    }
                }
                else {
                    throw new Error('format could not be found for date ' + date);
                }
            }
            else {
                this.setMoment(jalali_moment_1.default());
            }
        }
        else {
            this.setMoment(jalali_moment_1.default());
        }
        this.mDate.locale('en');
        resetMilliseconds && this.resetMilliSeconds();
    }
    static setDefaultTimeZone(tz) {
        this.timeZone = tz;
    }
    ;
    setMoment(moment) {
        if (index_1.default.isVoid(SmartDate.timeZone)) {
            this.mDate = moment;
        }
        else {
            this.mDate = moment;
            // this.mDate = moment.utcOffset(SmartDate.timeZone);
        }
    }
    formatISO(format = 'jYYYY/jMM/jDD HH:mm') {
        return jalali_moment_1.default(this.toISOString()).utc(true).format(format);
    }
    toLocale(format, locale = 'en') {
        const l = this.mDate.locale() || 'en';
        // const d = this.mDate.locale(locale).utcOffset(SmartDate.timeZone).format(format);
        const d = this.mDate.locale(locale).format(format);
        this.mDate.locale(l);
        return d;
    }
    ;
    toISOString() {
        return this.mDate.toISOString();
        // return this.mDate.format('YYYY-MM-DDThh:mm:ss.sZ');
        // return this.mDate.utc(true).format('YYYY-MM-DDThh:mm:ss.sZ');
    }
    /*
    public getUTCTimeStamp () {
      return this.mDate.toDate().getTime();
      // return moment.parseZone(this.toISOString()).utc(true).toDate().getTime();
    }
  */
    getTimezoneOffset() {
        return this.mDate.toDate().getTimezoneOffset();
    }
    UTCOffset() {
        return this.mDate.utcOffset();
    }
}
exports.SmartDate = SmartDate;
SmartDate.MAX_ISO_DATE = '+275760-09-13T00:00:00.000Z';
SmartDate.MIN_ISO_DATE = '-271821-04-20T00:00:00.000Z';
const smartDate = (date, resetMilliseconds = false) => {
    if (typeof date === 'boolean') {
        return new SmartDate(undefined, date);
    }
    else {
        return new SmartDate(date, resetMilliseconds);
    }
};
const now = () => {
    return jalali_moment_1.default().toDate().getTime();
};
/* function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
} */
Object.assign(smartDate, { now });
Object.assign(Index, { smartDate });
