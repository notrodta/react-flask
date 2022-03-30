import apiRequest from './ApiRequest';
import environmentConfig from '../Environment';
import { AxiosResponse } from 'axios';

const config = environmentConfig;

const storeService = {
  getAll: (): Promise<any> =>
    apiRequest
      .get(`${config.SiteUrl}/stores`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        throw new Error(error);
      }),
  get: (storeName: string): Promise<any> =>
    apiRequest
      .get(`${config.SiteUrl}/store/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        throw new Error(error);
      }),
  post: (storeName: string): Promise<any> =>
    apiRequest
      .post(`${config.SiteUrl}/store/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        // console.log(error);
        throw new Error(error);
      }),
  delete: (storeName: string): Promise<any> =>
    apiRequest
      .delete(`${config.SiteUrl}/store/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        throw new Error(error);
      })
};

export default storeService;
