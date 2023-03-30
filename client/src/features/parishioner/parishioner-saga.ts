import { PayloadAction } from '@reduxjs/toolkit';
import { parishionerApi } from 'api/parishioner';
import { parishionerActions } from 'features/parishioner/parishioner-slice';
import { PaginatedListParams, PaginatedListResponse, ParishionerBasicResponseDTO } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchParishionerList(action: PayloadAction<PaginatedListParams>) {
   try {
      const response: PaginatedListResponse<ParishionerBasicResponseDTO> = yield call(
         parishionerApi.getList,
         action.payload
      );
      console.log(response);

      yield put(parishionerActions.fetchParishionerListSuccess(response));
   } catch (error) {
      console.log('Failed to fetch parishioner list:', error);
      yield put(parishionerActions.fetchParishionerListFailed());
   }
}

export default function* parishionerSaga() {
   yield takeLatest(parishionerActions.fetchParishionerList, fetchParishionerList);
}
