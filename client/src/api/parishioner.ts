import axiosClient from 'api/axios-client';
import { ResourcePaths } from 'constants/api';
import {
   ID,
   PaginatedListParams,
   PaginatedListResponse,
   PaginatedParishionerResponseDTO,
   ParishionerDetailResponseDTO,
   ParishionerUpdateRequestDTO,
} from 'models';
import snakecaseKeys from 'snakecase-keys';
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
   update(payload: ParishionerUpdateRequestDTO) {
      const url = `${resourcePath}/update`;
      return axiosClient.post(url, snakecaseKeys(payload));
   },
};
