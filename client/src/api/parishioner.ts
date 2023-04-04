import axiosClient from 'api/axios-client';
import { ResourcePaths } from 'constants/api';
import {
   ID,
   PaginatedListParams,
   PaginatedListResponse,
   PaginatedParishionerResponseDTO,
   ParishionerDetailResponseDTO,
} from 'models';
import ParamUtils from 'utils/param';

const resourcePath = `${ResourcePaths.parishioner}`;

export const parishionerApi = {
   getList(
      params: PaginatedListParams
   ): Promise<PaginatedListResponse<PaginatedParishionerResponseDTO>> {
      const url = `${resourcePath}/list`;
      return axiosClient.get(url, {
         params: ParamUtils.toApiParams(params),
      });
   },
   getDetail(id: ID): Promise<ParishionerDetailResponseDTO> {
      const url = `${resourcePath}/detail/${id}`;
      return axiosClient.get(url);
   },
};
