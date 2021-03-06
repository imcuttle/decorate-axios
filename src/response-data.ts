import {AxiosInstance, AxiosPromise, AxiosResponse} from 'axios';
import {once} from "./_internal/once";

declare module 'axios' {
  interface AxiosRequestConfig {
    responseData?: boolean;
  }

  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig & {responseData: true}): Promise<T>;
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;

    request<T = any> (config: AxiosRequestConfig & {responseData: true}): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig & {responseData: true}): Promise<T>;
  }
}

export default function responseDataAxios() {
  return once((axios: AxiosInstance) => {
    const handle = (res: AxiosResponse) => {
      if (!res || !res.config) {
        return res;
      }
      if (res.config.responseData) {
        return res.data;
      }
      return res;
    };

    axios.interceptors.response.use(handle, handle);
  });
}
