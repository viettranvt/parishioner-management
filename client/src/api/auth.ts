import axiosClient from 'api/axios-client';
import { resourcePaths } from 'constants/api';
import { AuthLoginRequestDTO } from 'models/auth';

const resourcePath = `${resourcePaths.auth}`;

const authApi = {
   login(payload: AuthLoginRequestDTO) {
      const url = `${resourcePath}/login`;
      return axiosClient.post(url);
   },
};

export default authApi;
