import { Pagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { history } from 'app/store';
import { Button } from 'components/common';
import { ParishionerFilterForm } from 'components/forms';
import { PlusIcon } from 'components/icons';
import { ParishionerTable } from 'components/tables';
import { ApiParamField } from 'constants/api';
import { PageId, Pages } from 'constants/pages';
import {
   parishionerActions,
   selectParishionerFilter,
   selectParishionerList,
   selectParishionerLoading,
   selectParishionerPagination,
} from 'features/parishioner/parishioner-slice';
import { Op, ParishionerBasicData, ParishionerFilterFormData } from 'models';
import { ChangeEvent, useEffect } from 'react';
import ParamUtils, { FilterValue } from 'utils/param';

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

   const handleFilterSubmit = (filterData: ParishionerFilterFormData) => {
      const {
         fullName,
         christianNames,
         baptismDateRange,
         firstCommunionDateRange,
         confirmationDateRange,
         weddingDateRange,
      } = filterData;
      const filters = ParamUtils.createFilters<FilterValue>(
         [
            {
               field: ApiParamField.fullName,
               op: Op.Like,
               val: fullName,
            },
            {
               field: ApiParamField.christianName,
               op: Op.In,
               val: christianNames,
            },
            ParamUtils.createDateRangeFilter({
               field: ApiParamField.dateOfBaptism,
               dateRange: baptismDateRange,
            }),
            ParamUtils.createDateRangeFilter({
               field: ApiParamField.dateOfFirstCommunion,
               dateRange: firstCommunionDateRange,
            }),
            ParamUtils.createDateRangeFilter({
               field: ApiParamField.dateOfConfirmation,
               dateRange: confirmationDateRange,
            }),
            ParamUtils.createDateRangeFilter({
               field: ApiParamField.dateOfWedding,
               dateRange: weddingDateRange,
            }),
         ],
         filter.filters
      );

      dispatch(
         parishionerActions.setFilter({
            ...filter,
            page: 1,
            filters,
         })
      );
   };

   const handleCreateParishioner = () => {
      history.push(Pages.get(PageId.ParishionerCreating)?.path ?? '');
   };

   const handleDeleteParishioner = (data: ParishionerBasicData) => {
      dispatch(parishionerActions.deleteParishioner(data.id));
   };

   useEffect(() => {
      dispatch(
         parishionerActions.fetchParishionerList({
            page: filter.page,
            limit: filter.limit,
            filters: filter.filters,
            sorts: filter.sorts,
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
               <Button
                  icon={<PlusIcon className="w-5 h-5" />}
                  type="primary"
                  outlined
                  contrast
                  onClick={handleCreateParishioner}
               >
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
                  <ParishionerTable
                     parishioners={parishioners}
                     page={pagination.page}
                     limit={pagination.limit}
                     onDelete={handleDeleteParishioner}
                  />
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
