import { DateInputTypes } from '../../index';
declare const _default: {
    isDateWithin: (from: DateInputTypes, middle: DateInputTypes, to: DateInputTypes, offset?: number, options?: {
        ltComparator: (from: number, to: number) => boolean;
        gtComparator: (from: number, to: number) => boolean;
    }) => boolean;
    datesRangesConflict: (mDate: {
        from: number;
        to: number;
    }, conflicts: {
        from: number;
        to: number;
    }[], conflictTolerance?: number) => {
        from: number;
        to: number;
    } | undefined;
    findDateFormat: (date: string) => string | undefined;
};
export default _default;
