"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFileFormData = exports.Methods = void 0;
const axios_1 = __importDefault(require("axios"));
const __1 = require("../../../");
let axios = axios_1.default;
const gatewayConfig = {};
const bottleNeckQueue = {};
const handleError = async (err) => {
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
const wrap = async (method, params, defaultParams = {}) => {
    const rc = {
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
        return new Promise((resolve, reject) => {
            return __1.JobManager.queueJob(bottleNeck.key, async () => {
                return axios.request(rc).then(resolve).catch(reject);
            }, { item: { cancelToken: bottleNeck.source } });
        }).finally(() => {
            if (bottleNeckQueue[bottleNeck.key] === bottleNeck.source) {
                bottleNeckQueue[bottleNeck.key] = undefined;
            }
        }).catch(e => handleError(e));
    }
    return axios.request(rc).catch(e => handleError(e));
};
class Methods {
    constructor(defaultParams) {
        this.defaultParams = defaultParams;
    }
    // ...args: Parameters<typeof axios.patch>
    get(url, config) {
        return wrap('get', { url, config }, this.defaultParams);
    }
    put(url, data, config) {
        return wrap('put', { url, data, config }, this.defaultParams);
    }
    patch(url, data, config) {
        return wrap('patch', { url, data, config }, this.defaultParams);
    }
    post(url, data, config) {
        return wrap('post', { url, data, config }, this.defaultParams);
    }
    delete(url, config) {
        return wrap('delete', { url, config }, this.defaultParams);
    }
    options(url, config) {
        return wrap('options', { url, config }, this.defaultParams);
    }
    head(url, config) {
        return wrap('head', { url, config }, this.defaultParams);
    }
}
exports.Methods = Methods;
function createFileFormData(filePath, options) {
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
exports.createFileFormData = createFileFormData;
const setErrorHandler = (errorHandler) => {
    gatewayConfig.customErrorHandler = errorHandler;
};
const setAxiosInstance = (axiosInstance) => {
    axios = axiosInstance;
};
const withCancelerGroup = (key) => {
    __1.JobManager.initFactory(key, { capacity: 100, maxCapPolicy: 'drop', rateLimit: 0 });
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
exports.default = {
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
