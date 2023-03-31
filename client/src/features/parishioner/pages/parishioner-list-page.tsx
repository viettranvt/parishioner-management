import { Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Button } from 'components/common';
import { ParishionerFilterForm } from 'components/forms';
import { PlusIcon } from 'components/icons';
import { ParishionerTable } from 'components/tables';
import {
   parishionerActions,
   selectParishionerFilter,
   selectParishionerList,
   selectParishionerLoading,
   selectParishionerPagination,
} from 'features/parishioner/parishioner-slice';
import { FilterCondition, Op, ParishionerFilterFormData } from 'models';
import { ChangeEvent, useEffect } from 'react';

type GetNewFilterFieldValue = string | string[] | undefined;
interface GetNewFilterField<T extends GetNewFilterFieldValue> {
   field: string;
   op: Op;
   val?: T;
}

export default function ParishionerListPage() {
   const dispatch = useAppDispatch();
   const parishioners = useAppSelector(selectParishionerList);
   const pagination = useAppSelector(selectParishionerPagination);
   const filter = useAppSelector(selectParishionerFilter);
   const loading = useAppSelector(selectParishionerLoading);

   const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
      dispatch(
         parishionerActions.setFilter({
            ...filter,
            page,
         })
      );
   };

   const getNewFilters = <T extends GetNewFilterFieldValue>(
      fields: GetNewFilterField<T>[]
   ): FilterCondition[] => {
      const filters = [...(filter.filters || [])];

      fields.forEach((field) => {
         const { val } = field;
         const index = filters.findIndex((f) => f.field === field.field);

         if (val) {
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
            filters.splice(index, 1);
         }
      });

      return filters;
   };

   const handleFilterSubmit = (filterData: ParishionerFilterFormData) => {
      const { fullName, christianNames } = filterData;
      const filters = getNewFilters<typeof fullName | typeof christianNames>([
         {
            field: 'full_name',
            op: Op.Like,
            val: fullName,
         },
         {
            field: 'christian_name',
            op: Op.In,
            val: christianNames,
         },
      ]);
      dispatch(
         parishionerActions.setFilter({
            ...filter,
            page: 1,
            filters,
         })
      );
   };

   useEffect(() => {
      dispatch(
         parishionerActions.fetchParishionerList({
            page: filter.page,
            limit: filter.limit,
            filters: filter.filters,
            sort: filter.sort,
         })
      );
   }, [dispatch, filter]);

   return (
      <>
         <div className="flex justify-between">
            <div className="text-white">
               <h3 className="text-xl font-bold sm:text-2xl">Giáo dân</h3>
               <p className="mt-2 text-sm">
                  <span>Tổng cộng:</span>
                  <span className="ml-2">
                     <strong>{pagination.total}</strong>
                  </span>
               </p>
            </div>
            <div>
               <Button icon={<PlusIcon className="w-5 h-5" />} type="primary" outlined contrast>
                  Thêm mới
               </Button>
            </div>
         </div>
         <div className="card bg-base-100 mt-6 p-4 shadow-lg">
            <div className="grid grid-cols-4 gap-4 pt-3">
               <div className="col-span-1">
                  <div className="card pl-2 pr-6">
                     <ParishionerFilterForm onSubmit={handleFilterSubmit} />
                  </div>
               </div>
               <div className="col-span-3">
                  <ParishionerTable parishioners={parishioners} page={pagination.page} />
                  <div className="flex justify-center mt-5">
                     <Pagination
                        count={Math.ceil(pagination.total / pagination.limit)}
                        page={pagination.page}
                        onChange={handlePageChange}
                        disabled={loading}
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
