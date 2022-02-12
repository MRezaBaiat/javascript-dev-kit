import moment from 'jalali-moment';
import Kit, { DateInputTypes, smartDate } from '../../index';
import has = Reflect.has;

const isDateWithin = (from: DateInputTypes, middle: DateInputTypes, to: DateInputTypes, offset = 0, options: {ltComparator:(from: number, to: number) =>boolean, gtComparator:(from: number, to: number) =>boolean } = { ltComparator: Number.lte, gtComparator: Number.gte }): boolean => {
  const { ltComparator, gtComparator } = options;
  const fromTime = smartDate(from).resetMilliSeconds().getTime() - offset;
  const middleTime = smartDate(middle).resetMilliSeconds().getTime();
  const toTime = smartDate(to).resetMilliSeconds().getTime() + offset;
  return ltComparator(fromTime, middleTime) && gtComparator(toTime, middleTime);
};

// input number only for better performance
const datesRangesConflict = (mDate: {from:number, to:number}, conflicts: {from:number, to:number}[], conflictTolerance = 0) => {
  conflictTolerance = Math.abs(conflictTolerance);
  return conflicts.find((confDate) => {
    if (mDate.from < confDate.from) {
      return mDate.to - confDate.from > conflictTolerance; // (conflictTolerance || -1)
    }

    if (confDate.from < mDate.from) {
      return confDate.to - mDate.from > conflictTolerance; // (conflictTolerance || -1)
    }

    return true;
  });
};

/* const datesConflict = (ranges: { from: DateInputTypes; to: DateInputTypes }[], offset = -1) => {
  return ranges.find((r) => {
    return ranges.find(
      (r2) =>
        r2 !== r &&
        ((r.from === r2.from && r.to === r2.to) ||
            isDateWithin(r.from, r2.from, r.to, offset) ||
            isDateWithin(r.from, r2.to, r.to, offset) ||
            isDateWithin(r2.from, r.from, r2.to, offset) ||
            isDateWithin(r2.from, r.to, r2.to, offset))
    );
  });
}; */

const determineRightFormat = (date: string) => {
  const arr = date.split(':');
  switch (arr.length) {
    case 2:
      return 'HH:mm';
    case 3:
      return 'HH:mm:ss';
    case 4:
      return 'HH:mm:ss:SSS';
    default:
      return undefined;
  }
};

const determineLeftFormat = (date: string, jalali: boolean) => {
  const separator = date.includes('-') ? '-' : '/';
  date = date.replaceAll('-', ' ').replaceAll('/', ' ');
  const prefix = jalali ? 'j' : '';
  const arr = date.split(' ');
  switch (arr.length) {
    case 1:
      return `${prefix}DD`;
    case 2:
      return `${prefix}MM${separator}${prefix}DD`;
    case 3:
      return `${prefix}${
        arr[0].length === 2 ? 'YY' : 'YYYY'
      }${separator}${prefix}MM${separator}${prefix}DD`;
    default:
      return undefined;
  }
};

const testFormat = (date: string, format: string) => {
  try {
    if (date === '24:00') {
      date = '00:00';
    }
    if (date === '24:00:00') {
      date = '00:00:00';
    }
    const m = moment(date, format);
    if (m.format(format) === date) {
      return m.toDate().getTime() > 0;
    }
    return false;
  } catch (e) {
    return false;
  }
};

const findDateFormat = (date: string): string | undefined => {
  date = Kit.numbersToEnglish(date.trim());
  if (date.includes('+')) {
    return 'YYYY-MM-DDThh:mm:ssTZD';
  }
  const isUtc = date.includes('T') && date.endsWith('Z');
  const hasMilliSec = date.includes('.');

  if (isUtc) {
    date = date.replace('T', ' ')
      .replace('Z', '');
  }
  if (hasMilliSec) {
    date = date.split('.')[0];
  }
  function checkUTC (format: string) {
    if (!format) {
      return format;
    }
    if (hasMilliSec) {
      format += '.SSS';
    }
    if (isUtc || !format) {
      format = format.replace(' ', 'T') + 'Z';
    }
    return format;
  }
  const arr = date.split(' ');

  if (arr.length === 1) {
    if (date.includes(':')) {
      const f = determineRightFormat(date);
      if (f && testFormat(date, f)) {
        return checkUTC(f);
      }
      return undefined;
    } else {
      let f = determineLeftFormat(date, false);
      if (f && testFormat(date, f)) {
        return checkUTC(f);
      }
      f = determineLeftFormat(date, true);
      if (f && testFormat(date, f)) {
        return checkUTC(f);
      }
      return undefined;
    }
  } else if (arr.length === 2) {
    const dateFormat = findDateFormat(arr[0]);
    const hourFormat = findDateFormat(arr[1]);
    if (!dateFormat || !hourFormat) {
      return undefined;
    }
    return checkUTC(dateFormat + ' ' + hourFormat);
  } else {
    return undefined;
  }
};

export default {
  isDateWithin,
  datesRangesConflict,
  findDateFormat
};
