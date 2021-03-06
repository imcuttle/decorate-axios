import { parse, tokensToFunction } from 'path-to-regexp';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

declare module 'axios' {
  interface AxiosRequestConfig {
    pathData?: any;
  }
}
/**
 * 支持 axios.get('/user/:id', { data: { id: '123' } })
 */
export default function pathRegexpAxios() {
  return (axios: AxiosInstance) => {
    const handle = (req: AxiosRequestConfig) => {
      if (!req.pathData) {
        return req;
      }

      let tokens: any = [];
      try {
        tokens = parse(req.url || '', {});
      } catch (_) {}
      const toPath = tokensToFunction(tokens);
      const data = req.pathData || {};
      try {
        req.url = toPath(data);
      } catch (e) {
        console.error('Request Error:', req, e);
      }
      tokens.forEach((token: any) => {
        if (token.name != null) {
          delete data[token.name];
        }
      });

      return req;
    };

    axios.interceptors.request.use(handle);
  };
}
