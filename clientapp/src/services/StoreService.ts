import apiRequest from './ApiRequest';
import environmentConfig from '../Environment';
import { AxiosResponse } from 'axios';

const config = environmentConfig;

const storeService = {
  getAll: () =>
    apiRequest
      .get(`${config.SiteUrl}/stores`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(error);
      }),
  get: (storeName: string) =>
    apiRequest
      .get(`${config.SiteUrl}/stores/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(error);
      })
};

export default storeService;
