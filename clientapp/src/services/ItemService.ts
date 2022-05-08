import apiRequest from './ApiRequest';
import environmentConfig from '../Environment';
import { AxiosResponse } from 'axios';
import { handleError } from './ServiceHelper';

const config = environmentConfig;

const itemService = {
  post: (itemName: string, data: any): Promise<any> =>
    apiRequest
      .post(`${config.SiteUrl}/item/${itemName}`, data)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(data);
        handleError(error);
      })
};

export default itemService;
