import axiosClient from 'api/axios-client';
import { resourcePaths } from 'constants/api';
import { AuthLoginRequestDTO, AuthLoginResponseDTO } from 'models/auth';

const resourcePath = `${resourcePaths.auth}`;

export const authApi = {
   login(payload: AuthLoginRequestDTO): Promise<AuthLoginResponseDTO> {
      const url = `${resourcePath}/login`;
      return axiosClient.post(url, payload);
   },
};
