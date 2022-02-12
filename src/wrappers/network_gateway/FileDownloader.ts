import Gateway from './Gateway';
import { JobManager } from '../../../index';
import { Job } from '../JobManager';
import axios, { CancelTokenSource } from 'axios';
import stream from 'stream';

interface StatusNone{
    code: 'none'
}
interface StatusFinished{
    code: 'finished'
}
interface StatusInQueue{
    code: 'in_queue'
}
interface StatusDownloading{
    code: 'downloading',
    progress:number
}
interface StatusFailed{
    code: 'failed'
}
interface DownloadProps<T = any>{
    url: string,
    destinationPath: string,
    expected_size?: number,
    headers?: {[key: string]: string},
    info?: T,
}
interface DownloadQueue<T = any> extends DownloadProps<T>{
    status: StatusDownloading | StatusFailed | StatusFinished | StatusInQueue | StatusNone,
}

let writerFnc: (queue: DownloadQueue)=> stream.Writable;
const jobsFactory = JobManager.initFactory<Downloader>('kit-gateway-file-downloader', { capacity: Number.MAX_VALUE, maxCapPolicy: 'drop' });
const listeners: {[key:string]:((job: Downloader)=>void)} [] = [];

const setWriter = (fnc: (queue: DownloadQueue)=>stream.Writable) => {
  writerFnc = fnc;
};

const addListener = (url: string, cb: (queue: DownloadQueue)=>void) => {
  listeners[url] = listeners[url] || [];
  !listeners[url].includes(cb) && listeners[url].push(cb);
  notifyListeners(url);
};

const removeListener = (cb: Function) => {
  Object.keys(listeners).forEach((url) => {
    while (listeners[url].includes(cb)) {
      listeners[url].splice(listeners[url].indexOf(cb), 1);
    }
  });
};

const notifyListeners = (url: string) => {
  const downloader = getDownloader(url) || { queue: { status: { code: 'none' } } };
  listeners[url] && listeners[url].forEach(cb => cb(downloader?.queue));
};

/* const findQueue = (url: string): DownloadQueue | undefined => {
  const download = jobsFactory.iterateJobs(j => j.item.queue.url === url);
  return download && download.item.queue;
}; */

// private
const getDownloader = (url: string): Downloader | undefined => {
  const job = jobsFactory.iterateJobs(j => j.item.queue.url === url);
  return job && job.item;
};
// private
const getJob = (url: string): Job<Downloader> | undefined => {
  return jobsFactory.iterateJobs(j => j.item.queue.url === url);
};

const forceDownload = (url: string) => {
  /* const job = getDownloader(url);
  if (!job) {
    return scheduleDownload(url);
  } */
  // checkQueue();
};

const scheduleDownload = (props: DownloadProps) => {
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

const cancelDownload = (url: string) => {
  const job = getJob(url);
  if (job) {
    if (job.item.queue.status.code === 'downloading') {
      job.item.cancel();
    } else {
      jobsFactory.removeJob(job);
    }
  }
};

class Downloader {
    public queue: DownloadQueue;
    private cancelSource: CancelTokenSource | undefined;
    constructor (queue: DownloadQueue) {
      this.queue = queue;
      this.queue.status = {
        code: 'in_queue'
      };
    }

    public cancel () {
      this.cancelSource && this.cancelSource.cancel();
    }

    public download = () => {
      const { queue } = this;
      console.log(queue.url);
      // store.dispatch(actionReceiveStatusChangedForUrl(queue.id, ReceiveStatus.DOWNLOADING));
      queue.status = {
        code: 'downloading',
        progress: 0
      };
      notifyListeners(queue.url);
      this.cancelSource = axios.CancelToken.source();
      return Gateway.get(
        queue.url,
        {
          cancelToken: this.cancelSource.token,
          responseType: 'stream',
          method: 'GET',
          headers: queue.headers
        }
      ).then(async (res) => {
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
              } else {
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
}

export default {
  cancelDownload,
  scheduleDownload,
  addListener,
  removeListener,
  forceDownload,
  setWriter
};
