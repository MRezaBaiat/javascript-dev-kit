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
const mocha_1 = require("mocha");
const assert_1 = __importDefault(require("assert"));
const jalali_moment_1 = __importDefault(require("jalali-moment"));
const __1 = __importStar(require("../"));
mocha_1.describe('SmartDate test', () => {
    mocha_1.it('normal constructor', () => {
        const date1 = __1.smartDate();
        const date2 = __1.smartDate().add(1, 'milliseconds');
        assert_1.default(date1.getTime() !== date2.getTime());
        assert_1.default(!date1.isSameDate(date2));
        assert_1.default(date2.isAfter(date1));
        assert_1.default(date1.isBefore(date2));
    });
    mocha_1.it('with constructor ignoring milliseconds', () => {
        const date1 = __1.smartDate(true);
        const date2 = __1.smartDate().add(1, 'milliseconds').resetMilliSeconds();
        assert_1.default(date1.getTime() === date2.getTime());
        assert_1.default(date1.isSameDate(date2));
        assert_1.default(!date2.isAfter(date1));
        assert_1.default(!date1.isBefore(date2));
    });
    mocha_1.it('test constructor with moment input', () => {
        const date = jalali_moment_1.default().milliseconds(0);
        const sd = __1.smartDate(date);
        date.add(1, 'day');
        assert_1.default(sd.getTime() !== date.toDate().getTime());
        assert_1.default(__1.smartDate(date).formatGregorian() === date.format('YYYY/MM/DD HH:mm'));
        assert_1.default(__1.smartDate(date).formatJalali() === date.format('jYYYY/jMM/jDD HH:mm'));
        assert_1.default(__1.smartDate(date).usePersianDigits().formatJalali() ===
            __1.default.numbersToPersian(date.format('jYYYY/jMM/jDD HH:mm')));
        assert_1.default(__1.smartDate(date).getTime() === date.toDate().getTime());
    });
    mocha_1.it('test set beginning and end of day', () => {
        const beginningOfDay = __1.smartDate().toBeginningOfDay().getTime();
        const endOfDay = __1.smartDate().toEndOfDay().getTime();
        assert_1.default(((endOfDay - beginningOfDay) - (24 * 60 * 60 * 1000) + 1) === 0);
    });
    mocha_1.it('test constructor with number input', () => {
        const date = jalali_moment_1.default().toDate().getTime();
        assert_1.default(__1.smartDate(date).getTime() === date);
    });
    mocha_1.it('test constructor with string input', () => {
        const date = jalali_moment_1.default();
        assert_1.default(__1.smartDate(date.format('YYYY/MM/DD HH:mm')).formatGregorian() ===
            date.format('YYYY/MM/DD HH:mm'));
        assert_1.default(__1.smartDate(date.format('YYYY/MM/DD HH:mm')).formatJalali() ===
            date.format('jYYYY/jMM/jDD HH:mm'));
        assert_1.default(!__1.smartDate(date.format('YYYY/MM/DD HH:mm:ss'), false).isSameDate(date));
        assert_1.default(__1.smartDate(date.format('YYYY/MM/DD HH:mm:ss')).isSameDate(date.milliseconds(0)));
    });
    mocha_1.it('testing isSameDate function ignoring milliseconds', () => {
        const date1 = __1.smartDate();
        const date2 = __1.smartDate().add(1, 'milliseconds');
        assert_1.default(!date1.isSameDate(date2));
        assert_1.default(date1.isSameDate(date2, true));
    });
    mocha_1.it('testing variables match real date', () => {
        const date = __1.smartDate();
        console.log(`${date.year()}/${date.month()}/${date.day()} ${date.hour()}:${date.minutes()}:${date.seconds()}`);
        console.log(date.formatGregorian('YYYY/M/D H:m:s'));
        assert_1.default(date.formatGregorian('YYYY/M/D H:m:s') ===
            `${date.year()}/${date.month()}/${date.day()} ${date.hour()}:${date.minutes()}:${date.seconds()}`);
        assert_1.default(date.formatJalali('YYYY/M/D H:m:s') ===
            `${date.jYear()}/${date.jMonth()}/${date.jDay()} ${date.hour()}:${date.minutes()}:${date.seconds()}`);
    });
    mocha_1.it('testing day name', () => {
        const date = __1.smartDate();
        assert_1.default(date.dayName());
        // console.log(Days)
        assert_1.default(date.jDayName());
        assert_1.default(date.toDay());
    });
});
