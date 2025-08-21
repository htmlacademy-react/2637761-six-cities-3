import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {getToken} from './token';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true
};

type ErrorData = {
  errorType: string;
  message: string;
}

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && shouldDisplayError(error.response)) {
        const data: ErrorData = error.response.data as ErrorData;
        if (data){
          toast.warn(data.message);
        }
      }
      throw error;
    }
  );

  return api;
};
