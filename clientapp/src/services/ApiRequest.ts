import axios, { AxiosPromise } from 'axios';
import { GetEnvironment } from '../Environment';

export interface IAxiosRequestOptions {
  accept?: string;
  withCredentials?: boolean;
  headers?: any;
  params?: {};
  reponseType?: any;
}

const defaultOptions: IAxiosRequestOptions = {
  accept: 'application/json',
  headers: {
    'Content-Type': 'application/json',
    ...(GetEnvironment() !== 'LOCAL' && { Pragma: 'no-cache' })
  }
};

const ApiRequest = {
  get: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.get(url, { ...defaultOptions, ...options });
  },
  post: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.post(url, { ...defaultOptions, ...options });
  },
  put: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.put(url, { ...defaultOptions, ...options });
  },
  delete: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.delete(url, { ...defaultOptions, ...options });
  }
};

export default ApiRequest;
