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
require("../src/polyfills/polyfills");
const __1 = __importStar(require("../"));
const DateUtils_1 = __importDefault(require("../src/utils/DateUtils"));
// import Kit, {smartDate} from "../index";
mocha_1.describe('DateUtils test', () => {
    mocha_1.it('testing format finder', () => {
        assert_1.default(__1.default.findDateFormat('1399/10/12 12:21:32:493') === 'jYYYY/jMM/jDD HH:mm:ss:SSS');
        assert_1.default(__1.default.findDateFormat('1399/10/12 12:21:32') === 'jYYYY/jMM/jDD HH:mm:ss');
        assert_1.default(__1.default.findDateFormat(__1.default.numbersToPersian('1399/10/12 12:21:32')) === 'jYYYY/jMM/jDD HH:mm:ss');
        assert_1.default(__1.default.findDateFormat('2020/10/12 12:21:32') === 'YYYY/MM/DD HH:mm:ss');
        assert_1.default(__1.default.findDateFormat('2020/10/12 12:21') === 'YYYY/MM/DD HH:mm');
        assert_1.default(__1.default.findDateFormat('2020/10/12') === 'YYYY/MM/DD');
        assert_1.default(__1.default.findDateFormat('12:21:32') === 'HH:mm:ss');
        assert_1.default(__1.default.findDateFormat('12:21') === 'HH:mm');
        assert_1.default(__1.default.findDateFormat('1399-10-12 12:21:32:493') === 'jYYYY-jMM-jDD HH:mm:ss:SSS');
        assert_1.default(__1.default.findDateFormat('1399-10-12 12:21') === 'jYYYY-jMM-jDD HH:mm');
        assert_1.default(__1.default.findDateFormat('1399-10-12') === 'jYYYY-jMM-jDD');
    });
    mocha_1.it('testing date ranges conflicts finder', () => {
        const mDate = { from: '10:00', to: '11:00' };
        let fromIncrement = 0;
        let toIncrement = 0;
        let mConflictDate = { from: __1.smartDate('11:00').getTime(), to: __1.smartDate('12:00').getTime() };
        const conflicts = (forgivingOffset) => {
            return DateUtils_1.default.datesRangesConflict({ from: __1.smartDate(mDate.from).getTime(), to: __1.smartDate(mDate.to).getTime() }, [{ from: mConflictDate.from + fromIncrement, to: mConflictDate.to + toIncrement }], forgivingOffset);
        };
        assert_1.default(!conflicts(0));
        fromIncrement = 1;
        assert_1.default(!conflicts(0));
        fromIncrement = -1;
        assert_1.default(conflicts(0));
        assert_1.default(!conflicts(1));
        fromIncrement = 0;
        assert_1.default(!conflicts(1));
        fromIncrement = 1;
        assert_1.default(!conflicts(1));
        fromIncrement = 0;
        mConflictDate = { from: __1.smartDate('09:00').getTime(), to: __1.smartDate('10:00').getTime() };
        assert_1.default(!conflicts(0));
        assert_1.default(!conflicts(1));
        toIncrement = 1;
        assert_1.default(conflicts(0));
        assert_1.default(!conflicts(1));
        toIncrement = -1;
        assert_1.default(!conflicts(0));
        assert_1.default(!conflicts(1));
        toIncrement = 0;
        mConflictDate = { from: __1.smartDate('10:00').getTime(), to: __1.smartDate('11:00').getTime() };
        assert_1.default(conflicts(0));
        assert_1.default(conflicts(30000));
        toIncrement = 1000;
        fromIncrement = 1000;
        assert_1.default(conflicts(0));
        assert_1.default(conflicts(4000));
        toIncrement = -1000;
        fromIncrement = -1000;
        assert_1.default(conflicts(0));
        assert_1.default(conflicts(4000));
    });
});
