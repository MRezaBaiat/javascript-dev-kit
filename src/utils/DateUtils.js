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
const jalali_moment_1 = __importDefault(require("jalali-moment"));
const index_1 = __importStar(require("../../index"));
const isDateWithin = (from, middle, to, offset = 0, options = { ltComparator: Number.lte, gtComparator: Number.gte }) => {
    const { ltComparator, gtComparator } = options;
    const fromTime = index_1.smartDate(from).resetMilliSeconds().getTime() - offset;
    const middleTime = index_1.smartDate(middle).resetMilliSeconds().getTime();
    const toTime = index_1.smartDate(to).resetMilliSeconds().getTime() + offset;
    return ltComparator(fromTime, middleTime) && gtComparator(toTime, middleTime);
};
// input number only for better performance
const datesRangesConflict = (mDate, conflicts, conflictTolerance = 0) => {
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
const determineRightFormat = (date) => {
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
const determineLeftFormat = (date, jalali) => {
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
            return `${prefix}${arr[0].length === 2 ? 'YY' : 'YYYY'}${separator}${prefix}MM${separator}${prefix}DD`;
        default:
            return undefined;
    }
};
const testFormat = (date, format) => {
    try {
        if (date === '24:00') {
            date = '00:00';
        }
        if (date === '24:00:00') {
            date = '00:00:00';
        }
        const m = jalali_moment_1.default(date, format);
        if (m.format(format) === date) {
            return m.toDate().getTime() > 0;
        }
        return false;
    }
    catch (e) {
        return false;
    }
};
const findDateFormat = (date) => {
    date = index_1.default.numbersToEnglish(date.trim());
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
    function checkUTC(format) {
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
        }
        else {
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
    }
    else if (arr.length === 2) {
        const dateFormat = findDateFormat(arr[0]);
        const hourFormat = findDateFormat(arr[1]);
        if (!dateFormat || !hourFormat) {
            return undefined;
        }
        return checkUTC(dateFormat + ' ' + hourFormat);
    }
    else {
        return undefined;
    }
};
exports.default = {
    isDateWithin,
    datesRangesConflict,
    findDateFormat
};
