interface Job<T = any> extends JobOptions<T> {
}
interface JobOptions<T = any> {
    item: T;
    priority?: number;
    cancelListener?: (job: Job<T>) => void;
}
interface JobFactoryParams {
    rateLimit?: number;
    capacity: number;
    maxCapPolicy: 'drop' | 'drop_oldest';
}
interface JobFactory<ReturnType> {
    schedule(runnable: () => void, options: JobOptions): ReturnType;
}
declare class Factory<T = any, ReturnType = Job<T> | undefined> implements JobFactory<ReturnType> {
    private readonly uniqueKey;
    private readonly factoryParams;
    private readonly queue;
    private lastJob?;
    private currentJob?;
    private currentTimerId?;
    private customMaxCapHandler?;
    constructor(uniqueKey: string, params: JobFactoryParams);
    setMaxCapacityHandler: (cb?: ((queue: Job[], runningJob?: Job<T> | undefined) => Job<T> | void) | undefined) => void;
    removeJob: (job?: Job<any> | undefined) => void;
    getCurrentJob: () => Job<T> | undefined;
    iterateJobs: (cb: (job: Job<T>) => any | undefined) => Job<T> | undefined;
    private startTimer;
    private execute;
    private checkState;
    private poll;
    private getJobsQuantity;
    private addJob;
    schedule(runnable: () => void, options?: {
        item?: T;
        priority?: number;
        cancelListener?: (job: Job<T>) => void;
    }): ReturnType;
}
declare const getFactory: <T>(key: string) => Factory<T, Job<T> | undefined> | undefined;
declare const initFactory: <T>(key: string, props: JobFactoryParams) => Factory<T, Job<T> | undefined>;
declare const removeFactory: (key: string) => void;
declare const queueJob: <T = any>(key: string, runnable: () => void, options?: JobOptions<any> | undefined) => Job<T> | undefined;
export { Job, initFactory, removeFactory, queueJob, getFactory };
