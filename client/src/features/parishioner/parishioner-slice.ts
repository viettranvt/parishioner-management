import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
   PaginatedListParams,
   PaginatedListResponse,
   PaginationResponse,
   ParishionerBasicData,
} from 'models';

export interface ParishionerState {
   loading: boolean;
   list: ParishionerBasicData[];
   pagination: PaginationResponse;
   filter: PaginatedListParams;
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

// reducer
const parishionerReducer = parishionerSlice.reducer;
export default parishionerReducer;
