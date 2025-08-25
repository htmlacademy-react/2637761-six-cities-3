import axios, {AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import {getToken} from './token';
import { CONFIG } from '../config/appConfig';

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
const isApiError = (error: unknown): error is ErrorData => (
  typeof error === 'object' &&
    error !== null &&
    'errorType' in error &&
    'message' in error &&
    typeof (error as ErrorData).errorType === 'string' &&
    typeof (error as ErrorData).message === 'string'
);

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: CONFIG.api.baseUrl,
    timeout: CONFIG.api.timeout,
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
      if (error.response && shouldDisplayError(error.response) && isApiError(error.response.data)) {
        toast.warn(error.message);
      }
      throw error;
    }
  );

  return api;
};
