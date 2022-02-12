import { describe, it } from 'mocha';
import assert from 'assert';
import moment from 'jalali-moment';
import Kit, { smartDate } from '../';

describe('SmartDate test', () => {
  it('normal constructor', () => {
    const date1 = smartDate();
    const date2 = smartDate().add(1, 'milliseconds');
    assert(date1.getTime() !== date2.getTime());
    assert(!date1.isSameDate(date2));
    assert(date2.isAfter(date1));
    assert(date1.isBefore(date2));
  });

  it('with constructor ignoring milliseconds', () => {
    const date1 = smartDate(true);
    const date2 = smartDate().add(1, 'milliseconds').resetMilliSeconds();
    assert(date1.getTime() === date2.getTime());
    assert(date1.isSameDate(date2));
    assert(!date2.isAfter(date1));
    assert(!date1.isBefore(date2));
  });

  it('test constructor with moment input', () => {
    const date = moment().milliseconds(0);
    const sd = smartDate(date);
    date.add(1, 'day');
    assert(sd.getTime() !== date.toDate().getTime());
    assert(
      smartDate(date).formatGregorian() === date.format('YYYY/MM/DD HH:mm')
    );
    assert(
      smartDate(date).formatJalali() === date.format('jYYYY/jMM/jDD HH:mm')
    );
    assert(
      smartDate(date).usePersianDigits().formatJalali() ===
        Kit.numbersToPersian(date.format('jYYYY/jMM/jDD HH:mm'))
    );
    assert(smartDate(date).getTime() === date.toDate().getTime());
  });

  it('test set beginning and end of day', () => {
    const beginningOfDay = smartDate().toBeginningOfDay().getTime();
    const endOfDay = smartDate().toEndOfDay().getTime();
    assert(((endOfDay - beginningOfDay) - (24 * 60 * 60 * 1000) + 1) === 0);
  });

  it('test constructor with number input', () => {
    const date = moment().toDate().getTime();
    assert(smartDate(date).getTime() === date);
  });

  it('test constructor with string input', () => {
    const date = moment();
    assert(
      smartDate(date.format('YYYY/MM/DD HH:mm')).formatGregorian() ===
        date.format('YYYY/MM/DD HH:mm')
    );
    assert(
      smartDate(date.format('YYYY/MM/DD HH:mm')).formatJalali() ===
        date.format('jYYYY/jMM/jDD HH:mm')
    );
    assert(
      !smartDate(date.format('YYYY/MM/DD HH:mm:ss'), false).isSameDate(date)
    );
    assert(
      smartDate(date.format('YYYY/MM/DD HH:mm:ss')).isSameDate(
        date.milliseconds(0)
      )
    );
  });

  it('testing isSameDate function ignoring milliseconds', () => {
    const date1 = smartDate();
    const date2 = smartDate().add(1, 'milliseconds');
    assert(!date1.isSameDate(date2));
    assert(date1.isSameDate(date2, true));
  });

  it('testing variables match real date', () => {
    const date = smartDate();
    console.log(`${date.year()}/${date.month()}/${date.day()} ${date.hour()}:${date.minutes()}:${date.seconds()}`);
    console.log(date.formatGregorian('YYYY/M/D H:m:s'));
    assert(
      date.formatGregorian('YYYY/M/D H:m:s') ===
        `${date.year()}/${date.month()}/${date.day()} ${date.hour()}:${date.minutes()}:${date.seconds()}`
    );
    assert(
      date.formatJalali('YYYY/M/D H:m:s') ===
        `${date.jYear()}/${date.jMonth()}/${date.jDay()} ${date.hour()}:${date.minutes()}:${date.seconds()}`
    );
  });

  it('testing day name', () => {
    const date = smartDate();
    assert(date.dayName());
    // console.log(Days)
    assert(date.jDayName());
    assert(date.toDay());
  });
});
