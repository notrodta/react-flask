import apiRequest from './ApiRequest';
import environmentConfig from '../Environment';
import { AxiosResponse } from 'axios';
import { handleError } from './ServiceHelper';
import UserLoginInfo from '../models/User';

const config = environmentConfig;

const userService = {
  post: (data: UserLoginInfo): Promise<any> =>
    apiRequest
      .post(`${config.SiteUrl}/login`, data)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(data);
        handleError(error);
      }),
  // githubLogin: (code: string): Promise<any> =>
  //   apiRequest
  //     .post(`${config.SiteUrl}/githublogin`, code)
  //     .then((response: AxiosResponse) => {
  //       return response ? response.data : {};
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       handleError(error);
  //     })
  githubLogin: (code: string): Promise<any> =>
    apiRequest
      .post(`${config.SiteUrl}/github/${code}`)
      .then((response: AxiosResponse) => {
        return response ? response.data : {};
      })
      .catch(function (error) {
        console.log(error);
        handleError(error);
      })
};

export default userService;
