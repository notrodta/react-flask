import apiRequest from './ApiRequest';
import environmentConfig from '../Environment';
import { AxiosResponse } from 'axios';
import { handleError } from './ServiceHelper';

const config = environmentConfig;

const storeService = {
  getAll: (): Promise<any> =>
    apiRequest
      .get(`${config.SiteUrl}/stores`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        handleError(error);
      }),
  get: (storeName: string): Promise<any> =>
    apiRequest
      .get(`${config.SiteUrl}/store/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        handleError(error);
      }),
  post: (storeName: string): Promise<any> =>
    apiRequest
      .post(`${config.SiteUrl}/store/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        handleError(error);
      }),
  delete: (storeName: string): Promise<any> =>
    apiRequest
      .delete(`${config.SiteUrl}/store/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        handleError(error);
      })
};

export default storeService;
