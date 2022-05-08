import axios, { AxiosPromise } from 'axios';
// import { GetEnvironment } from '../environment';
import { getEnvironment } from '../Environment';

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
    ...(getEnvironment() !== 'LOCAL' && { Pragma: 'no-cache' })
  }
};

const apiRequest = {
  get: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.get(url, { ...defaultOptions, ...options });
  },
  post: <T>(url: string, data = {}, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.post(url, data, { ...defaultOptions, ...options });
  },
  // post: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
  //   return axios.post(url);
  // },
  put: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.put(url, { ...defaultOptions, ...options });
  },
  delete: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    return axios.delete(url, { ...defaultOptions, ...options });
  }
};

export default apiRequest;
