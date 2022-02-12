import AxiosStatic, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  Method
} from 'axios';
import { JobManager } from '../../../';

interface GatewayError<T> extends AxiosError<T>{
    handled: boolean,
    cancelled: boolean
}
interface GatewayConfig<T>{
  customErrorHandler?(e: GatewayError<T>): boolean // return whether the error was handled or not;
}
interface DefaultParams{
  config?: AxiosRequestConfig | undefined,
  bottleNeck?:{
    key: string,
    source: CancelTokenSource
  }
}
interface GatewayPromise<T> {
    catch(onrejected?: (err: GatewayError<T>) => any): GatewayPromise<T>,
    then(onfulfilled?: (res: AxiosResponse<T>) => any): GatewayPromise<T>,
    finally(onfinally?: (() => void) | undefined | null): GatewayPromise<T>
}
interface JobParams{
  cancelToken: CancelTokenSource,
  promise: GatewayPromise<any>
}
let axios = AxiosStatic;
const gatewayConfig: GatewayConfig<any> = {

};
const bottleNeckQueue: {[key: string]: CancelTokenSource | undefined} = {};
const handleError = async <T>(err: GatewayError<T>) => {
  err.handled = false;
  err.cancelled = false;
  if (err instanceof axios.Cancel) {
    err.handled = err.cancelled = true;
  }
  if (!err.handled) {
    err.handled = (gatewayConfig.customErrorHandler && gatewayConfig.customErrorHandler(err)) || false;
  }
  throw err;
};
// highWater = capacity , 0 means empty queue and only the running one
/* const limiter = new Bottleneck({
  strategy: Bottleneck.strategy.LEAK,
  maxConcurrent: 1,
  minTime: 0,
  highWater: 0
});

limiter.on('error', () => {
  console.log('err');
});
limiter.on('failed', () => {
  console.log('fail');
});
const group = new Bottleneck.Group({
  strategy: Bottleneck.strategy.OVERFLOW_PRIORITY,
  maxConcurrent: 1,
  minTime: 0,
  highWater: 0
});
group.key('my-key').on('message', (m) => {
  console.log(m);
}); */

// @ts-ignore
const wrap = async <T>(method: Method, params: { url?: string, data?: any, config?: AxiosRequestConfig }, defaultParams: DefaultParams = {}): GatewayPromise<T> => {
  const rc: AxiosRequestConfig = {
    ...(params.config || {}),
    data: params.data,
    url: params.url,
    method: method,
    ...(defaultParams.config || {})
  };
  if (defaultParams.bottleNeck) {
    const { bottleNeck } = defaultParams;
    if (bottleNeckQueue[bottleNeck.key]) {
      console.log('cancelling older request ');
      // @ts-ignore
      bottleNeckQueue[bottleNeck.key].cancel();
    }
    bottleNeckQueue[bottleNeck.key] = bottleNeck.source;

    return new Promise<T>((resolve: any, reject) => {
      return JobManager.queueJob(bottleNeck.key, async () => {
        return axios.request(rc).then(resolve).catch(reject);
      }, { item: { cancelToken: bottleNeck.source } });
    }).finally(() => {
      if (bottleNeckQueue[bottleNeck.key] === bottleNeck.source) {
        bottleNeckQueue[bottleNeck.key] = undefined;
      }
    }).catch(e => handleError<T>(e)) as GatewayPromise<T>;
  }
  return axios.request(rc).catch(e => handleError(e)) as GatewayPromise<T>;
};

export class Methods {
  private readonly defaultParams?: DefaultParams;
  constructor (defaultParams?: DefaultParams) {
    this.defaultParams = defaultParams;
  }

  // ...args: Parameters<typeof axios.patch>
  public get<T> (url: string, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('get', { url, config }, this.defaultParams);
  }

  public put<T> (url: string, data?: any, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('put', { url, data, config }, this.defaultParams);
  }

  public patch<T> (url: string, data?: any, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('patch', { url, data, config }, this.defaultParams);
  }

  public post<T> (url: string, data?: any, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('post', { url, data, config }, this.defaultParams);
  }

  public delete<T> (url: string, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('delete', { url, config }, this.defaultParams);
  }

  public options<T> (url: string, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('options', { url, config }, this.defaultParams);
  }

  public head<T> (url: string, config?: AxiosRequestConfig): GatewayPromise<T> {
    return wrap<T>('head', { url, config }, this.defaultParams);
  }
}

export function createFileFormData (filePath: string, options?: {keyName?: string, fileName?:string, type?: string}) {
  options = options || {};
  // @ts-ignore
  const formData = new FormData();
  formData.append(options.keyName || 'file', {
    uri: filePath,
    type: options.type || 'image/jpeg',
    name: options.fileName || 'photo.jpg'
  });
  return formData;
}

const setErrorHandler = (errorHandler: (e: GatewayError<any>) => boolean) => {
  gatewayConfig.customErrorHandler = errorHandler;
};

const setAxiosInstance = (axiosInstance) => {
  axios = axiosInstance;
};

const withCancelerGroup = (key: string) => {
  JobManager.initFactory(key, { capacity: 100, maxCapPolicy: 'drop', rateLimit: 0 });
  const cancelTokenSource = axios.CancelToken.source();
  return new Methods({
    bottleNeck: {
      key: key,
      source: cancelTokenSource
    },
    config: {
      cancelToken: cancelTokenSource.token
    }
  });
};

const methodsInstance = new Methods();

export default {
  withCancelerGroup,
  setErrorHandler,
  createFileFormData,
  setAxiosInstance,
  get: methodsInstance.get,
  post: methodsInstance.post,
  put: methodsInstance.put,
  patch: methodsInstance.patch,
  head: methodsInstance.head,
  options: methodsInstance.options,
  delete: methodsInstance.delete
};
