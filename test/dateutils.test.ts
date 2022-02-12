import { describe, it } from 'mocha';
import assert from 'assert';
import '../src/polyfills/polyfills';
import Kit, { smartDate } from '../';
import DateUtils from '../src/utils/DateUtils';
import { from } from 'jalali-moment';
// import Kit, {smartDate} from "../index";

describe('DateUtils test', () => {
  it('testing format finder', () => {
    assert(Kit.findDateFormat('1399/10/12 12:21:32:493') === 'jYYYY/jMM/jDD HH:mm:ss:SSS');
    assert(Kit.findDateFormat('1399/10/12 12:21:32') === 'jYYYY/jMM/jDD HH:mm:ss');
    assert(Kit.findDateFormat(Kit.numbersToPersian('1399/10/12 12:21:32')) === 'jYYYY/jMM/jDD HH:mm:ss');
    assert(Kit.findDateFormat('2020/10/12 12:21:32') === 'YYYY/MM/DD HH:mm:ss');
    assert(Kit.findDateFormat('2020/10/12 12:21') === 'YYYY/MM/DD HH:mm');
    assert(Kit.findDateFormat('2020/10/12') === 'YYYY/MM/DD');
    assert(Kit.findDateFormat('12:21:32') === 'HH:mm:ss');
    assert(Kit.findDateFormat('12:21') === 'HH:mm');
    assert(Kit.findDateFormat('1399-10-12 12:21:32:493') === 'jYYYY-jMM-jDD HH:mm:ss:SSS');
    assert(Kit.findDateFormat('1399-10-12 12:21') === 'jYYYY-jMM-jDD HH:mm');
    assert(Kit.findDateFormat('1399-10-12') === 'jYYYY-jMM-jDD');
  });

  it('testing date ranges conflicts finder', () => {
    const mDate = { from: '10:00', to: '11:00' };
    let fromIncrement = 0;
    let toIncrement = 0;
    let mConflictDate = { from: smartDate('11:00').getTime(), to: smartDate('12:00').getTime() };
    const conflicts = (forgivingOffset: number) => {
      return DateUtils.datesRangesConflict({ from: smartDate(mDate.from).getTime(), to: smartDate(mDate.to).getTime() }, [{ from: mConflictDate.from + fromIncrement, to: mConflictDate.to + toIncrement }], forgivingOffset);
    };

    assert(!conflicts(0));
    fromIncrement = 1;
    assert(!conflicts(0));
    fromIncrement = -1;
    assert(conflicts(0));
    assert(!conflicts(1));

    fromIncrement = 0;
    assert(!conflicts(1));
    fromIncrement = 1;
    assert(!conflicts(1));
    fromIncrement = 0;

    mConflictDate = { from: smartDate('09:00').getTime(), to: smartDate('10:00').getTime() };
    assert(!conflicts(0));
    assert(!conflicts(1));
    toIncrement = 1;
    assert(conflicts(0));
    assert(!conflicts(1));
    toIncrement = -1;
    assert(!conflicts(0));
    assert(!conflicts(1));
    toIncrement = 0;
    mConflictDate = { from: smartDate('10:00').getTime(), to: smartDate('11:00').getTime() };
    assert(conflicts(0));
    assert(conflicts(30000));
    toIncrement = 1000;
    fromIncrement = 1000;
    assert(conflicts(0));
    assert(conflicts(4000));
    toIncrement = -1000;
    fromIncrement = -1000;
    assert(conflicts(0));
    assert(conflicts(4000));
  });
});
