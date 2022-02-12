import Utils from '../utils/GeneralUtils';
require('../polyfills/polyfills');

declare type MaxCapacityPolicy = {// policy used when the queue has capped out
    drop_oldest: 'drop_oldest', // will drop the first in the queue and adds to the end of it
    drop: 'drop' // will drop current fed function
}
interface Job<T = any> extends JobOptions<T>{
    // onCancelled(cb: ()=>void): PublicJob<T>
}
interface JobOptions<T = any>{
    item: T,
    priority?: number,
    cancelListener?: (job: Job<T>)=>void,
}
interface FactoryJob<T = any> extends Job<T>{
    readonly runnable: ()=>void | Promise<any>,
    readonly priority: number,
    endDate: number
}
interface JobFactoryParams{
    rateLimit?: number,
    capacity: number,
    maxCapPolicy: 'drop' | 'drop_oldest'
}
// run<T>(getter: (fnc: any) => T, params?: {priority?: number}): Promise<T>
/* interface JobFactory {
    run(fnc: (whatever: any) => any)
} */
interface JobFactory<ReturnType>{
    schedule (runnable: () => void, options: JobOptions): ReturnType
}

class Factory<T = any, ReturnType = Job<T> | undefined> implements JobFactory<ReturnType> {
    private readonly uniqueKey: string;
    private readonly factoryParams: JobFactoryParams;
    private readonly queue: FactoryJob<T>[] = [];
    private lastJob?: FactoryJob<T>;
    private currentJob?: FactoryJob<T>;
    private currentTimerId?: any;
    private customMaxCapHandler?: (queue: Job[], runningJob?: Job<T>)=> Job<T> | void;
    public constructor (uniqueKey: string, params: JobFactoryParams) {
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

    public setMaxCapacityHandler = (cb?: (queue: Job[], runningJob?: Job<T>)=> Job<T> | void) => {
      this.customMaxCapHandler = cb;
    };

    public removeJob = (job?: Job) => {
      job && this.queue.removeValue(<FactoryJob>job);
    }

    public getCurrentJob = (): Job<T> | undefined => {
      return this.currentJob;
    };

    public iterateJobs = (cb: (job: Job<T>)=> any | undefined): Job<T> | undefined => {
      const { currentJob, queue } = this;
      if (currentJob && cb(currentJob)) {
        return currentJob;
      }
      return queue.find(cb);
    }

    private startTimer = () => {
      const { lastJob, factoryParams } = this;
      const { rateLimit } = factoryParams;
      this.currentTimerId = setTimeout(() => {
        this.currentTimerId = undefined;
        this.checkState();
        // @ts-ignore
      }, Math.max(Math.min(rateLimit - (Date.now() - lastJob.endDate), rateLimit), 0));
    };

    private execute = (job: FactoryJob) => {
      this.currentJob = job;
      const onEnd = () => {
        this.currentJob = job;
        job.endDate = Date.now();
        this.lastJob = job;
        this.currentJob = undefined;
        return this.checkState();
      };
      try {
        if (Utils.isAsync(job.runnable)) {
          // @ts-ignore
          job.runnable().catch(console.log).finally(onEnd);
        } else {
          const res = job.runnable();
          if (res && Utils.isAsync(res)) {
            res.catch(console.log).finally(onEnd);
          } else {
            onEnd();
          }
        }
      } catch (err) {
        console.log(err);
        onEnd();
      }
    };

    private checkState () {
      const job = this.poll();
      if (job) {
        return this.execute(job);
      }
      if (this.lastJob && !this.currentJob && !this.currentTimerId && this.factoryParams.rateLimit && this.queue.length !== 0) {
        this.startTimer();
      }
    };

    private poll = (): FactoryJob | undefined => {
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
    }

    private getJobsQuantity = () => {
      return this.queue.length + (this.currentJob ? 1 : 0);
    }

    private addJob (runnable: () => void, options: JobOptions): FactoryJob | undefined {
      const { queue, customMaxCapHandler, factoryParams, getJobsQuantity } = this;
      const { maxCapPolicy, capacity } = factoryParams;
      const job: FactoryJob = {
        runnable,
        cancelListener: options.cancelListener,
        item: options.item,
        priority: (options && options.priority) || 0,
        endDate: 0/*,
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
        } catch (e) {
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

    public schedule (runnable: () => void, options: {item?: T, priority?: number, cancelListener?: (job: Job<T>)=>void} = { priority: 0 }): ReturnType { // may only return null if MaxCapacityPolicy is set to drop
      options.priority = options.priority || 0;
      const job = this.addJob(runnable, <JobOptions>options);
      if (job) {
        try {
          console.log('job created , new size ' + this.getJobsQuantity());
          return job as any;
        } finally {
          this.checkState();
        }
      } else {
        console.log('refused to add the job');
        return undefined as any;
      }
    }
}

const activeFactories: { [key: string]: Factory } = {};

const getFactory = <T>(key: string): Factory<T> | undefined => {
  return activeFactories[key];
};

const initFactory = <T>(key: string, props: JobFactoryParams): Factory<T> => {
  // eslint-disable-next-line no-return-assign
  return activeFactories[key] = activeFactories[key] || new Factory<T>(key, props);
};

const removeFactory = (key: string) => {
  delete activeFactories[key];
};

const queueJob = <T = any>(key: string, runnable: ()=>void, options?: JobOptions): Job<T> | undefined => {
  const factory = activeFactories[key];
  if (!factory) {
    throw new Error('factory with key ' + key + ' was not found , you need to create one with calling initFactory()');
  }
  return factory.schedule(runnable, options);
};

export {
  Job,
  initFactory,
  removeFactory,
  queueJob,
  getFactory
};
