"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
const activities = {};
let timerId = undefined;
const startTimerIfNeeded = () => {
    if (timerId) {
        return;
    }
    timerId = setInterval(() => {
        const now = Date.now();
        Object.keys(activities).forEach((key) => {
            const activity = activities[key];
            if (now - activity.lastRunDate >= activity.delay) {
                runActivity(activity, now, false);
            }
        });
        stopTimerIfNeeded();
    }, Math.min(...Object.values(activities).map(a => a.delay)));
    console.log('started timer');
};
const stopTimerIfNeeded = () => {
    if (!timerId) {
        return;
    }
    const one = Object.keys(activities).find((a) => {
        if (activities[a].fnc) {
            return activities[a];
        }
    });
    if (!one) {
        clearInterval(timerId);
        timerId = undefined;
        console.log('stopped timer');
    }
};
const runActivity = (activity, now, checkTimer) => {
    activity.fnc && activity.fnc();
    activity.lastRunDate = now;
    activity.fnc = undefined;
    checkTimer && stopTimerIfNeeded();
};
/**
 * policy 'drop' just ignores the function was recently ran ,
 * but 'replace' will replace the latest function fed with the old one and will schedule
 */
const throttle = (key, interval, options, fnc) => {
    if (!fnc) {
        throw new Error('fnc can not be undefined');
    }
    const { policy } = options;
    const activity = (activities[key] = activities[key] || {
        lastRunDate: 0,
        delay: interval,
        fnc
    });
    const now = Date.now();
    if (now - activity.lastRunDate >= activity.delay) {
        activity.fnc = fnc;
        return runActivity(activity, now, true);
    }
    if (policy === 'replace') {
        activity.fnc = fnc;
        startTimerIfNeeded();
    }
};
exports.throttle = throttle;
