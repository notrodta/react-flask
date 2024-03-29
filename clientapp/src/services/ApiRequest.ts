import axios, { AxiosPromise } from 'axios';
// import { GetEnvironment } from '../environment';
import { getEnvironment } from '../Environment';

export const accessToken: { accessToken: string | null } = { accessToken: '' };

export interface IAxiosRequestOptions {
  accept?: string;
  withCredentials?: boolean;
  headers?: any;
  params?: {};
  reponseType?: any;
}

function getCookie(cname: any) {
  let name = cname + '=';
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function setAccessToken() {
  defaultOptions.headers.Authorization = 'Bearer ' + getCookie('accessToken') || 'none!!';
  // console.log(getCookie('accessToken'));
  // console.log(defaultOptions.headers.Authorization);
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
    setAccessToken();
    return axios.get(url, { ...defaultOptions, ...options });
  },
  post: <T>(url: string, data = {}, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    setAccessToken();
    return axios.post(url, data, { ...defaultOptions, ...options });
  },
  // post: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
  //   return axios.post(url);
  // },
  put: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    setAccessToken();
    return axios.put(url, { ...defaultOptions, ...options });
  },
  delete: <T>(url: string, options: IAxiosRequestOptions = {}): AxiosPromise<T[]> => {
    setAccessToken();
    return axios.delete(url, { ...defaultOptions, ...options });
  }
};

export default apiRequest;
