/// <reference types="node" />
import stream from 'stream';
interface StatusNone {
    code: 'none';
}
interface StatusFinished {
    code: 'finished';
}
interface StatusInQueue {
    code: 'in_queue';
}
interface StatusDownloading {
    code: 'downloading';
    progress: number;
}
interface StatusFailed {
    code: 'failed';
}
interface DownloadProps<T = any> {
    url: string;
    destinationPath: string;
    expected_size?: number;
    headers?: {
        [key: string]: string;
    };
    info?: T;
}
interface DownloadQueue<T = any> extends DownloadProps<T> {
    status: StatusDownloading | StatusFailed | StatusFinished | StatusInQueue | StatusNone;
}
declare const _default: {
    cancelDownload: (url: string) => void;
    scheduleDownload: (props: DownloadProps<any>) => void;
    addListener: (url: string, cb: (queue: DownloadQueue<any>) => void) => void;
    removeListener: (cb: Function) => void;
    forceDownload: (url: string) => void;
    setWriter: (fnc: (queue: DownloadQueue<any>) => stream.Writable) => void;
};
export default _default;
