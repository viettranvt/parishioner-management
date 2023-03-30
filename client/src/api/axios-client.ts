import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import AppConfig from 'constants/app-config';
import { LocalStorageItem } from 'constants/local-storage';
import qs from 'qs';

const axiosClient = axios.create({
   baseURL: AppConfig.apiEndpoint,
   headers: {
      'Content-Type': 'application/json',
   },
   paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
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
   function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
   }
);

export default axiosClient;
