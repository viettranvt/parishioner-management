import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, HttpStatusCode } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import AppConfig from 'constants/app-config';
import { LocalStorageItem } from 'constants/local-storage';
import { PageId, Pages } from 'constants/pages';
import qs from 'qs';
import snakecaseKeys from 'snakecase-keys';

const axiosClient = axios.create({
   baseURL: AppConfig.apiEndpoint,
   headers: {
      'Content-Type': 'application/json',
   },
   paramsSerializer: {
      serialize: (params) => qs.stringify(snakecaseKeys(params), { arrayFormat: 'repeat' }),
   },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
   function (config: AxiosRequestConfig) {
      // Attach existent access token to request header
      const accessToken = localStorage.getItem(LocalStorageItem.accessToken);
      if (accessToken) {
         config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
   function (response: AxiosResponse) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return camelcaseKeys(response.data.data, { deep: true });
   },
   function (error: AxiosError) {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
         localStorage.removeItem(LocalStorageItem.accessToken);
         window.location.href = Pages.get(PageId.Login)?.path ?? '';
      }

      return Promise.reject(error);
   }
);

export default axiosClient;
