"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFactory = exports.queueJob = exports.removeFactory = exports.initFactory = void 0;
const GeneralUtils_1 = __importDefault(require("../utils/GeneralUtils"));
require('../polyfills/polyfills');
class Factory {
    constructor(uniqueKey, params) {
        this.queue = [];
        this.setMaxCapacityHandler = (cb) => {
            this.customMaxCapHandler = cb;
        };
        this.removeJob = (job) => {
            job && this.queue.removeValue(job);
        };
        this.getCurrentJob = () => {
            return this.currentJob;
        };
        this.iterateJobs = (cb) => {
            const { currentJob, queue } = this;
            if (currentJob && cb(currentJob)) {
                return currentJob;
            }
            return queue.find(cb);
        };
        this.startTimer = () => {
            const { lastJob, factoryParams } = this;
            const { rateLimit } = factoryParams;
            this.currentTimerId = setTimeout(() => {
                this.currentTimerId = undefined;
                this.checkState();
                // @ts-ignore
            }, Math.max(Math.min(rateLimit - (Date.now() - lastJob.endDate), rateLimit), 0));
        };
        this.execute = (job) => {
            this.currentJob = job;
            const onEnd = () => {
                this.currentJob = job;
                job.endDate = Date.now();
                this.lastJob = job;
                this.currentJob = undefined;
                return this.checkState();
            };
            try {
                if (GeneralUtils_1.default.isAsync(job.runnable)) {
                    // @ts-ignore
                    job.runnable().catch(console.log).finally(onEnd);
                }
                else {
                    const res = job.runnable();
                    if (res && GeneralUtils_1.default.isAsync(res)) {
                        res.catch(console.log).finally(onEnd);
                    }
                    else {
                        onEnd();
                    }
                }
            }
            catch (err) {
                console.log(err);
                onEnd();
            }
        };
        this.poll = () => {
            const { lastJob, currentJob, queue } = this;
            const { rateLimit } = this.factoryParams;
            if (currentJob || queue.length === 0) {
                return;
            }
            if (lastJob && rateLimit && Date.now() - lastJob.endDate < rateLimit) {
                return;
            }
            let nextJob = queue[0];
            queue.forEach((q) => {
                if (q.priority > nextJob.priority) {
                    nextJob = q;
                }
            });
            queue.removeValue(nextJob);
            return nextJob;
        };
        this.getJobsQuantity = () => {
            return this.queue.length + (this.currentJob ? 1 : 0);
        };
        params.rateLimit = params.rateLimit || 0;
        if (params.rateLimit < 0) {
            throw new Error('rate limit can not be less than 0');
        }
        if (!params.maxCapPolicy) {
            throw new Error('you need to provide at least on MaxCapacityPolicy');
        }
        this.uniqueKey = uniqueKey;
        this.factoryParams = params;
    }
    checkState() {
        const job = this.poll();
        if (job) {
            return this.execute(job);
        }
        if (this.lastJob && !this.currentJob && !this.currentTimerId && this.factoryParams.rateLimit && this.queue.length !== 0) {
            this.startTimer();
        }
    }
    ;
    addJob(runnable, options) {
        const { queue, customMaxCapHandler, factoryParams, getJobsQuantity } = this;
        const { maxCapPolicy, capacity } = factoryParams;
        const job = {
            runnable,
            cancelListener: options.cancelListener,
            item: options.item,
            priority: (options && options.priority) || 0,
            endDate: 0 /*,
            onCancelled: (cb: () => void) => {
                console.log('canceller set')
              job.cancelListener = cb;
              return job;
            } */
        };
        if (getJobsQuantity() < capacity) {
            queue.push(job);
            return job;
        }
        if (customMaxCapHandler) {
            try {
                const currentJob = this.currentJob;
                customMaxCapHandler(this.queue, currentJob);
                if (this.getJobsQuantity() < capacity) {
                    queue.push(job);
                    return job;
                }
                console.log('cap handle was not accepted');
            }
            catch (e) {
                console.log(e);
            }
        }
        if (maxCapPolicy === 'drop_oldest') {
            if (queue.length > 0) {
                const removed = queue.shift();
                removed && removed.cancelListener && removed.cancelListener(removed);
                queue.push(job);
                return job;
            }
        }
        /* if (maxCapPolicy === 'drop') {
              return undefined;
          } */
        return undefined;
    }
    schedule(runnable, options = { priority: 0 }) {
        options.priority = options.priority || 0;
        const job = this.addJob(runnable, options);
        if (job) {
            try {
                console.log('job created , new size ' + this.getJobsQuantity());
                return job;
            }
            finally {
                this.checkState();
            }
        }
        else {
            console.log('refused to add the job');
            return undefined;
        }
    }
}
const activeFactories = {};
const getFactory = (key) => {
    return activeFactories[key];
};
exports.getFactory = getFactory;
const initFactory = (key, props) => {
    // eslint-disable-next-line no-return-assign
    return activeFactories[key] = activeFactories[key] || new Factory(key, props);
};
exports.initFactory = initFactory;
const removeFactory = (key) => {
    delete activeFactories[key];
};
exports.removeFactory = removeFactory;
const queueJob = (key, runnable, options) => {
    const factory = activeFactories[key];
    if (!factory) {
        throw new Error('factory with key ' + key + ' was not found , you need to create one with calling initFactory()');
    }
    return factory.schedule(runnable, options);
};
exports.queueJob = queueJob;
