import axiosClient from 'api/axios-client';
import { ResourcePaths } from 'constants/api';
import {
   PaginatedListParams,
   PaginatedListResponse,
   PaginatedParishionerResponseDTO,
} from 'models';

const resourcePath = `${ResourcePaths.parishioner}`;

export const parishionerApi = {
   getList(
      params: PaginatedListParams
   ): Promise<PaginatedListResponse<PaginatedParishionerResponseDTO>> {
      const url = `${resourcePath}/list`;
      return axiosClient.get(url, { params });
   },
};
