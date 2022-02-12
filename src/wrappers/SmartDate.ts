import moment from 'jalali-moment';
import Kit, {
  DateInputTypes,
  Day,
  DayId,
  Days,
  YYYYMMDD,
  YYYYMMDDHH,
  YYYYMMDDHHmm
} from '../../index';
import DateUtils from '../utils/DateUtils';

const Index = require('../../index');
const TZ_TEHRAN = 'utc+03:30';
const TZ_UTC = 'utc+00:00';
class SmartDate {
  private static timeZone;
  private mDate!: moment.Moment;
  private persianDigits = false;
  public static MAX_ISO_DATE = '+275760-09-13T00:00:00.000Z'
  public static MIN_ISO_DATE = '-271821-04-20T00:00:00.000Z'

  public static setDefaultTimeZone (tz: string) {
    this.timeZone = tz;
  };

  private setMoment (moment: moment.Moment) {
    if (Kit.isVoid(SmartDate.timeZone)) {
      this.mDate = moment;
    } else {
      this.mDate = moment;
      // this.mDate = moment.utcOffset(SmartDate.timeZone);
    }
  }

  /**
   * @param date any
   * @param resetMilliseconds and input type of string will set the milliseconds to 0
   */
  constructor (date?: DateInputTypes, resetMilliseconds?: boolean) {
    if (date) {
      if (typeof date === 'number') {
        this.setMoment(moment(date));
      } else if (typeof date === 'object') {
        // @ts-ignore
        this.setMoment(moment(date.mDate ? date.mDate.clone() : moment(date)));
      } else if (typeof date === 'string') {
        date = Kit.numbersToEnglish(date);
        // const format = Kit.findDateFormat(date);
        const format = moment(date).creationData().format as string || DateUtils.findDateFormat(date);
        if (format) {
          if (format.toLowerCase().includes('z') && !format.toLowerCase().endsWith('z')) {
            this.setMoment(moment.parseZone(date));
          } else {
            this.setMoment(moment(date, format));
          }
          if (
            resetMilliseconds === undefined ||
              resetMilliseconds === null ||
              resetMilliseconds
          ) {
            !format.includes('SSS') && this.resetMilliSeconds();
          }
        } else {
          throw new Error('format could not be found for date ' + date);
        }
      } else {
        this.setMoment(moment());
      }
    } else {
      this.setMoment(moment());
    }
    this.mDate.locale('en');
    resetMilliseconds && this.resetMilliSeconds();
  }

  public usePersianDigits = (persian = true) => {
    this.persianDigits = persian;
    return this;
  };

  private toNumberDigits = (value: number | string): number => {
    return this.persianDigits ? Number(Kit.numbersToPersian(String(value))) : Number(value);
  };

  public formatGregorian = (format = 'YYYY/MM/DD HH:mm'): string => {
    const formatted = this.toLocale(format, 'en');
    return this.persianDigits ? Kit.numbersToPersian(formatted) : formatted;
  };

  public formatJalali = (format = 'jYYYY/jMM/jDD HH:mm'): string => {
    const formatted = this.toLocale(format, 'fa');
    return this.persianDigits ? Kit.numbersToPersian(formatted) : formatted;
  };

  public formatISO (format = 'jYYYY/jMM/jDD HH:mm') {
    return moment(this.toISOString()).utc(true).format(format);
  }

  private toLocale (format: string, locale = 'en') {
    const l = this.mDate.locale() || 'en';
    // const d = this.mDate.locale(locale).utcOffset(SmartDate.timeZone).format(format);
    const d = this.mDate.locale(locale).format(format);
    this.mDate.locale(l);
    return d;
  };

  private initParam = (
    value: number | string | undefined,
    fallBack: () => number | string
  ) => {
    if (value === null || value === undefined) {
      return fallBack();
    }
    return value;
  };

  private setGregorianTimeProps = (props: {
    year?: number | string;
    month?: number | string;
    day?: number | string;
    hour?: number | string;
    minutes?: number | string;
    seconds?: number | string;
    mss?: number | string;
  }) => {
    const { initParam } = this;
    props.year = initParam(props.year, this.year);
    props.month = initParam(props.month, this.month);
    props.day = initParam(props.day, this.day);
    props.hour = initParam(props.hour, this.hour);
    props.minutes = initParam(props.minutes, this.minutes);
    props.seconds = initParam(props.seconds, this.seconds);
    props.mss = initParam(props.mss, this.millisecondsOfSecond);
    const { year, month, day, hour, minutes, seconds, mss } = props;
    this.setMoment(moment(
        `${year}/${month}/${day} ${hour}:${minutes}:${seconds}.${mss}`,
        'YYYY/MM/DD HH:mm:ss:SSS'
    ));
    return this;
  };

  private setJalaliTimeProps = (props: {
    year?: number | string;
    month?: number | string;
    day?: number | string;
    hour?: number | string;
    minutes?: number | string;
    seconds?: number | string;
    mss?: number | string;
  }) => {
    const { initParam } = this;
    props.year = initParam(props.year, this.jYear);
    props.month = initParam(props.month, this.jMonth);
    props.day = initParam(props.day, this.jDay);
    props.hour = initParam(props.hour, this.hour);
    props.minutes = initParam(props.minutes, this.minutes);
    props.seconds = initParam(props.seconds, this.seconds);
    props.mss = initParam(props.mss, this.millisecondsOfSecond);
    const { year, month, day, hour, minutes, seconds, mss } = props;
    this.setMoment(moment(
        `${year}/${month}/${day} ${hour}:${minutes}:${seconds}.${mss}`,
        'jYYYY/jMM/jDD HH:mm:ss:SSS'
    ));
    return this;
  };

  public toBeginningOfDay = () => {
    return this.setGregorianTimeProps({
      hour: 0,
      minutes: 0,
      seconds: 0,
      mss: 0
    });
  };

  public toEndOfDay = () => {
    return this.setGregorianTimeProps({
      hour: 23,
      minutes: 59,
      seconds: 59,
      mss: 999
    });
  };

  public resetMilliSeconds = () => {
    this.mDate.milliseconds(0);
    return this;
  };

  /* public setMilliSeconds = (mss: string) => { // must be SSS
      return this.setGregorianTimeProps({ mss });
    }; */

  public setDay = (day: number | string) => {
    return this.setGregorianTimeProps({ day });
  };

  public setJDay = (day: number | string) => {
    return this.setJalaliTimeProps({ day });
  };

  public setMonth = (month: number | string) => {
    return this.setGregorianTimeProps({ month });
  };

  public setJMonth = (month: number | string) => {
    return this.setJalaliTimeProps({ month });
  };

  public setYear = (year: number | string) => {
    return this.setGregorianTimeProps({ year });
  };

  public setJYear = (year: number | string) => {
    return this.setJalaliTimeProps({ year });
  };

  public setHour = (hour: number | string) => {
    return this.setGregorianTimeProps({ hour });
  };

  public setMinutes = (minutes: number | string) => {
    return this.setGregorianTimeProps({ minutes });
  };

  public setSeconds = (seconds: number | string) => {
    return this.setGregorianTimeProps({ seconds });
  };

  public hour = () => {
    return this.toNumberDigits(this.toLocale('HH'));
  };

  public minutes = () => {
    return this.toNumberDigits(this.toLocale('mm'));
  };

  public seconds = () => {
    return this.toNumberDigits(this.toLocale('ss'));
  };

  public millisecondsOfSecond = (): string => {
    return this.toLocale('SSS'); // should not be converted to number or the whole thing will not work correctly
  };

  public getTime = () => {
    return this.mDate.toDate().getTime();
  };

  public toISOString () {
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

  public getTimezoneOffset () {
    return this.mDate.toDate().getTimezoneOffset();
  }

  public UTCOffset () {
    return this.mDate.utcOffset();
  }

  public day = () => {
    return this.toNumberDigits(this.toLocale('DD'));
  };

  public jDay = () => {
    return this.toNumberDigits(this.toLocale('jDD'));
  };

  public month = () => {
    return this.toNumberDigits(this.toLocale('MM'));
  };

  public jMonth = () => {
    return this.toNumberDigits(this.toLocale('jMM'));
  };

  public year = () => {
    return this.toNumberDigits(this.toLocale('YYYY'));
  };

  public jYear = () => {
    return this.toNumberDigits(this.toLocale('jYYYY'));
  };

  public dayName = (): DayId => {
    return this.toLocale('dddd').toLowerCase() as any;
  };

  public jDayName = () => {
    return Days[this.dayName()].name.fa;
  };

  public toDay = (): Day => {
    return Days[this.dayName()];
  };

  public toMoment = () => {
    return this.mDate;
  };

  public toYMDHM = (): YYYYMMDDHHmm => {
    return this.formatGregorian('YYYY/MM/DD HH:mm');
  };

  public toYMDH = (): YYYYMMDDHH => {
    return this.formatGregorian('YYYY/MM/DD HH');
  };

  public toYMD = (): YYYYMMDD => {
    return this.formatGregorian('YYYY/MM/DD');
  };

  public toHM = (): YYYYMMDDHH => {
    return this.formatGregorian('HH:mm');
  };

  public add = (
    amount: number,
    type: | 'year'
      | 'jYear'
      | 'month'
      | 'jMonth'
      | 'weeks'
      | 'day'
      | 'hour'
      | 'minutes'
      | 'seconds'
      | 'milliseconds'
  ) => {
    this.mDate.add(amount, type);
    return this;
  };

  public isSameDate = (date: DateInputTypes, ignoreMilliseconds = false) => {
    return (
      smartDate(this, ignoreMilliseconds).getTime() ===
      smartDate(date, ignoreMilliseconds).getTime()
    );
  };

  public isBefore = (date: DateInputTypes) => {
    return this.getTime() < smartDate(date).getTime();
  };

  public isAfter = (date: DateInputTypes) => {
    return this.getTime() > smartDate(date).getTime();
  };

  public clone = () => {
    return smartDate(this.mDate.clone());
  };

  public toString = () => {
    return this.formatGregorian();
  }
}

const smartDate = (date?: DateInputTypes | boolean, resetMilliseconds = false): SmartDate => {
  if (typeof date === 'boolean') {
    return new SmartDate(undefined, date);
  } else {
    return new SmartDate(date, resetMilliseconds);
  }
};

const now = (): number => {
  return moment().toDate().getTime();
};

type SMDClass = SmartDate;
export {
  SMDClass,
  SmartDate
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

declare module '../../index'{
 /* export function smartDate(): SmartDate;
  export function smartDate(date?: DateInputTypes | boolean): SmartDate;
  export function smartDate(resetMilliseconds? : boolean): SmartDate;
  export function smartDate(date: DateInputTypes, resetMilliseconds? : boolean): SmartDate;
  export class smartDate {
    public static now(): number;
    public static setDefaultTimeZone (tz: string);
  }
  export namespace smartDate{
    export type SmartDate = SMDClass;
  } */
}
