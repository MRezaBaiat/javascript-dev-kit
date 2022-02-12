"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gateway_1 = __importDefault(require("./Gateway"));
const index_1 = require("../../../index");
const axios_1 = __importDefault(require("axios"));
let writerFnc;
const jobsFactory = index_1.JobManager.initFactory('kit-gateway-file-downloader', { capacity: Number.MAX_VALUE, maxCapPolicy: 'drop' });
const listeners = [];
const setWriter = (fnc) => {
    writerFnc = fnc;
};
const addListener = (url, cb) => {
    listeners[url] = listeners[url] || [];
    !listeners[url].includes(cb) && listeners[url].push(cb);
    notifyListeners(url);
};
const removeListener = (cb) => {
    Object.keys(listeners).forEach((url) => {
        while (listeners[url].includes(cb)) {
            listeners[url].splice(listeners[url].indexOf(cb), 1);
        }
    });
};
const notifyListeners = (url) => {
    const downloader = getDownloader(url) || { queue: { status: { code: 'none' } } };
    listeners[url] && listeners[url].forEach(cb => cb(downloader?.queue));
};
/* const findQueue = (url: string): DownloadQueue | undefined => {
  const download = jobsFactory.iterateJobs(j => j.item.queue.url === url);
  return download && download.item.queue;
}; */
// private
const getDownloader = (url) => {
    const job = jobsFactory.iterateJobs(j => j.item.queue.url === url);
    return job && job.item;
};
// private
const getJob = (url) => {
    return jobsFactory.iterateJobs(j => j.item.queue.url === url);
};
const forceDownload = (url) => {
    /* const job = getDownloader(url);
    if (!job) {
      return scheduleDownload(url);
    } */
    // checkQueue();
};
const scheduleDownload = (props) => {
    if (!writerFnc) {
        throw new Error('you must set a writer first');
    }
    if (!getDownloader(props.url)) {
        const downloader = new Downloader({ ...props, status: { code: 'in_queue' } });
        jobsFactory.schedule(downloader.download, {
            item: downloader,
            cancelListener: (job) => {
                notifyListeners(job.item.queue.url);
            }
        });
    }
};
const cancelDownload = (url) => {
    const job = getJob(url);
    if (job) {
        if (job.item.queue.status.code === 'downloading') {
            job.item.cancel();
        }
        else {
            jobsFactory.removeJob(job);
        }
    }
};
class Downloader {
    constructor(queue) {
        this.download = () => {
            const { queue } = this;
            console.log(queue.url);
            // store.dispatch(actionReceiveStatusChangedForUrl(queue.id, ReceiveStatus.DOWNLOADING));
            queue.status = {
                code: 'downloading',
                progress: 0
            };
            notifyListeners(queue.url);
            this.cancelSource = axios_1.default.CancelToken.source();
            return Gateway_1.default.get(queue.url, {
                cancelToken: this.cancelSource.token,
                responseType: 'stream',
                method: 'GET',
                headers: queue.headers
            }).then(async (res) => {
                if (res.status !== 200) {
                    throw new Error('server responded with status ' + res.status);
                }
                const writer = writerFnc(this.queue);
                const total = res.headers['content-length'] || 0;
                return new Promise((resolve, reject) => {
                    if (total > 0) {
                        let written = 0;
                        // @ts-ignore
                        res.data.on('data', (chunk) => {
                            written += chunk.length;
                            const percent = Math.round((written * 100) / total);
                            if (queue.status.code === 'downloading') {
                                queue.status.progress = percent || 0;
                                notifyListeners(queue.url);
                            }
                            else {
                                console.log('status code is not downloading !');
                            }
                        });
                    }
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                    // @ts-ignore
                    res.data.pipe(writer);
                });
            }).then(() => {
                console.log('finished');
                queue.status = {
                    code: 'finished'
                };
                notifyListeners(queue.url);
            }).catch(() => {
                console.log('error');
                queue.status = {
                    code: 'failed'
                };
                notifyListeners(queue.url);
            });
        };
        this.queue = queue;
        this.queue.status = {
            code: 'in_queue'
        };
    }
    cancel() {
        this.cancelSource && this.cancelSource.cancel();
    }
}
exports.default = {
    cancelDownload,
    scheduleDownload,
    addListener,
    removeListener,
    forceDownload,
    setWriter
};
