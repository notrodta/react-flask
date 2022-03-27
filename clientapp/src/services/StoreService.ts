import ApiRequest from './ApiRequest';
import EnvironmentConfig from '../Environment';
import { AxiosResponse } from 'axios';

const config = EnvironmentConfig;

const StoreService = {
  getAll: () =>
    ApiRequest.get(`${config.SiteUrl}/stores`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(error);
      }),
  get: (storeName: string) =>
    ApiRequest.get(`${config.SiteUrl}/stores/${storeName}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(error);
      })
};

export default StoreService;
