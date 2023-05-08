import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ApiParamField } from 'constants/api';
import {
   ID,
   PaginatedListParams,
   PaginatedListResponse,
   PaginationResponse,
   ParishionerBasicData,
   ParishionerCreateRequestDTO,
   ParishionerDetailData,
   ParishionerUpdateRequestDTO,
} from 'models';

export interface ParishionerState {
   loading: boolean;
   list: ParishionerBasicData[];
   pagination: PaginationResponse;
   filter: PaginatedListParams;
   detail?: ParishionerDetailData;
}

const initialState: ParishionerState = {
   loading: false,
   list: [],
   pagination: {
      page: 1,
      limit: 10,
      total: 0,
   },
   filter: {
      page: 1,
      limit: 20,
      sorts: [
         {
            field: ApiParamField.createdAt,
            asc: false,
         },
      ],
   },
};

const parishionerSlice = createSlice({
   name: 'parishioner',
   initialState,
   reducers: {
      fetchParishionerList(state, action: PayloadAction<PaginatedListParams>) {
         state.loading = true;
      },
      fetchParishionerListSuccess(
         state,
         action: PayloadAction<PaginatedListResponse<ParishionerBasicData>>
      ) {
         state.loading = false;
         state.list = action.payload.data;
         state.pagination = action.payload.paging;
      },
      fetchParishionerListFailed(state) {
         state.loading = false;
      },
      fetchParishionerDetail(state, action: PayloadAction<ID>) {
         state.loading = true;
      },
      fetchParishionerDetailSuccess(state, action: PayloadAction<ParishionerDetailData>) {
         state.loading = false;
         state.detail = action.payload;
      },
      fetchParishionerDetailFailed(state) {
         state.loading = false;
      },
      createParishioner(state, action: PayloadAction<ParishionerCreateRequestDTO>) {
         state.loading = true;
      },
      createParishionerSuccess(state) {
         state.loading = false;
      },
      createParishionerFailed(state) {
         state.loading = false;
      },
      updateParishioner(state, action: PayloadAction<ParishionerUpdateRequestDTO>) {
         state.loading = true;
      },
      updateParishionerSuccess(state) {
         state.loading = false;
      },
      updateParishionerFailed(state) {
         state.loading = false;
      },
      deleteParishioner(state, action: PayloadAction<ID>) {
         state.loading = true;
      },
      deleteParishionerSuccess(state) {
         state.loading = false;
      },
      deleteParishionerFailed(state) {
         state.loading = false;
      },

      setFilter(state, action: PayloadAction<PaginatedListParams>) {
         state.filter = action.payload;
      },
   },
});

// actions
export const parishionerActions = parishionerSlice.actions;

// selectors
export const selectParishionerList = (state: RootState) => state.parishioner.list;
export const selectParishionerLoading = (state: RootState) => state.parishioner.loading;
export const selectParishionerPagination = (state: RootState) => state.parishioner.pagination;
export const selectParishionerFilter = (state: RootState) => state.parishioner.filter;
export const selectParishionerDetail = (state: RootState) => state.parishioner.detail;

// reducer
const parishionerReducer = parishionerSlice.reducer;
export default parishionerReducer;
