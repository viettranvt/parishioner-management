import { ApiParams, DateRange, FilterCondition, Op } from 'models';
import moment from 'moment';

export type FilterValue = string | string[] | undefined;
export interface FilterField<T extends FilterValue> {
   field: string;
   op: Op;
   val?: T;
}

interface DateRangeFilterField {
   field: string;
   dateRange?: DateRange;
}

const ParamUtils = {
   toApiParams<T extends ApiParams>(params: T) {
      const { filters } = params;
      return { ...params, filters: filters ? JSON.stringify(filters) : undefined };
   },
   createFilters<T extends FilterValue>(
      fields: FilterField<T>[],
      originFilters: FilterCondition[] = []
   ): FilterCondition[] {
      let filters = [...originFilters];
      fields.forEach((field) => {
         const { val } = field;
         const index = filters.findIndex((f) => f.field === field.field);
         if ((val && typeof val === 'string') || (Array.isArray(val) && val.length)) {
            const newVal: string[] = Array.isArray(val) ? val : [val];

            if (index > -1) {
               filters[index] = { ...filters[index], val: newVal };
            } else {
               filters.push({
                  field: field.field,
                  op: field.op,
                  val: newVal,
               });
            }
         } else {
            filters = filters.filter((_, _index) => _index !== index);
         }
      });

      return filters;
   },
   createDateRangeFilter(param: DateRangeFilterField): FilterField<string[] | undefined> {
      const dateRange = param.dateRange;
      return {
         field: param.field,
         op: Op.In,
         val: dateRange
            ? [
                 moment(dateRange.startDate).startOf('day').valueOf().toString(),
                 moment(dateRange.endDate).endOf('day').valueOf().toString(),
              ]
            : undefined,
      };
   },
};

export default ParamUtils;
