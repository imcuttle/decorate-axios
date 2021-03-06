import { AxiosInstance } from 'axios';
import {once} from "./_internal/once";

declare module 'axios' {
  interface AxiosRequestConfig {}
}

// 字符串类型 data，修改 content-type 为 text/plain
export default function stringDataAxios() {
  return once((axios: AxiosInstance) => {
    if (typeof axios.defaults.transformRequest === 'function') {
      axios.defaults.transformRequest = [axios.defaults.transformRequest]
    }
    if (!axios.defaults.transformRequest) {
      axios.defaults.transformRequest = []
    }
    axios.defaults.transformRequest.push((data, headers) => {
      if (typeof data === 'string') {
        if (headers && !headers['content-type'] && !headers['Content-Type']) {
          headers['Content-Type'] = 'text/plain;charset=utf-8';
        }
      }
      return data;
    });
  });
}
