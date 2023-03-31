import { ApiParams } from 'models';

const ParamUtils = {
   toApiParams<T extends ApiParams>(params: T) {
      const { filters } = params;
      return { ...params, filters: filters ? JSON.stringify(filters) : undefined };
   },
};

export default ParamUtils;
