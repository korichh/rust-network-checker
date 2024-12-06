import axios, { AxiosInstance } from "axios";

export interface ApiConfig {
  baseURL: string;
}
export type GetApiFunc = () => Promise<AxiosInstance>;

export function makeEndpoint<T extends unknown[], R>(
  func: (getApi: GetApiFunc, ...args: T) => Promise<R>,
  getApi: GetApiFunc
): (...args: T) => Promise<R> {
  return (...args: T) => func(getApi, ...args);
}

export function createAxiosInstance({ baseURL }: ApiConfig) {
  const instance = axios.create({
    headers: {
      ContentType: "application/json",
    },
    baseURL,
  });

  instance.interceptors.response.use(
    response => {
      return response.data || response.status === 200;
    },
    error => {
      const errorsStr: string | undefined = error.response?.data?.errors
        ? Object.values(error.response.data.errors).join(", ")
        : undefined;
      const errorStr: string | undefined = error.response?.data?.error;

      if (errorsStr) {
        error.response.data.message = errorsStr;
      }
      if (errorStr) {
        error.response.data.message = errorStr;
      }

      return Promise.reject(error);
    },
  );

  return instance;
}
