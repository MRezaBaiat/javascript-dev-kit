import { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
interface GatewayError<T> extends AxiosError<T> {
    handled: boolean;
    cancelled: boolean;
}
interface DefaultParams {
    config?: AxiosRequestConfig | undefined;
    bottleNeck?: {
        key: string;
        source: CancelTokenSource;
    };
}
interface GatewayPromise<T> {
    catch(onrejected?: (err: GatewayError<T>) => any): GatewayPromise<T>;
    then(onfulfilled?: (res: AxiosResponse<T>) => any): GatewayPromise<T>;
    finally(onfinally?: (() => void) | undefined | null): GatewayPromise<T>;
}
export declare class Methods {
    private readonly defaultParams?;
    constructor(defaultParams?: DefaultParams);
    get<T>(url: string, config?: AxiosRequestConfig): GatewayPromise<T>;
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): GatewayPromise<T>;
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): GatewayPromise<T>;
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): GatewayPromise<T>;
    delete<T>(url: string, config?: AxiosRequestConfig): GatewayPromise<T>;
    options<T>(url: string, config?: AxiosRequestConfig): GatewayPromise<T>;
    head<T>(url: string, config?: AxiosRequestConfig): GatewayPromise<T>;
}
export declare function createFileFormData(filePath: string, options?: {
    keyName?: string;
    fileName?: string;
    type?: string;
}): any;
declare const _default: {
    withCancelerGroup: (key: string) => Methods;
    setErrorHandler: (errorHandler: (e: GatewayError<any>) => boolean) => void;
    createFileFormData: typeof createFileFormData;
    setAxiosInstance: (axiosInstance: any) => void;
    get: <T>(url: string, config?: AxiosRequestConfig | undefined) => GatewayPromise<T>;
    post: <T_1>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => GatewayPromise<T_1>;
    put: <T_2>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => GatewayPromise<T_2>;
    patch: <T_3>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => GatewayPromise<T_3>;
    head: <T_4>(url: string, config?: AxiosRequestConfig | undefined) => GatewayPromise<T_4>;
    options: <T_5>(url: string, config?: AxiosRequestConfig | undefined) => GatewayPromise<T_5>;
    delete: <T_6>(url: string, config?: AxiosRequestConfig | undefined) => GatewayPromise<T_6>;
};
export default _default;
