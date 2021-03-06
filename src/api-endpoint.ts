import { AxiosInstance, AxiosRequestConfig } from 'axios';
import {once} from "./_internal/once";

type ApiEndpointOptions = {
  endPoints?: {
    [name: string]: string;
  };
  defaultEndpoint?: string;
};

declare module 'axios' {
  interface AxiosRequestConfig {
    endpointSource?: string | undefined;
  }
}

export default function apiEndpointAxios({ defaultEndpoint, endPoints }: ApiEndpointOptions) {
  return once((axios: AxiosInstance) => {
    if (defaultEndpoint) {
      axios.defaults.baseURL = defaultEndpoint;
    }

    const handle = (requestConfig: AxiosRequestConfig) => {
      if (requestConfig.endpointSource) {
        if (endPoints) {
          requestConfig.baseURL = endPoints[requestConfig.endpointSource];
        }
      }

      return requestConfig;
    };

    axios.interceptors.request.use(handle);
  });
}
