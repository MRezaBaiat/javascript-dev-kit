const activities: {
  [key: string]: {
    delay: number;
    lastRunDate: number;
    fnc?: () => void;
  };
} = {};

let timerId = undefined as any;

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

const runActivity = (activity: any, now: number, checkTimer: boolean) => {
  activity.fnc && activity.fnc();
  activity.lastRunDate = now;
  activity.fnc = undefined;
  checkTimer && stopTimerIfNeeded();
};

/**
 * policy 'drop' just ignores the function was recently ran ,
 * but 'replace' will replace the latest function fed with the old one and will schedule
 */
const throttle = (key: string, interval: number, options: { policy: 'replace' | 'drop' }, fnc: () => void) => {
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
// TODO
// return an object containing a forceRun function

export {
  throttle // TODO also add throttleByFunction which works with uniqueness of functions . checkout lodash throttle for more info
};
