import { PayloadAction } from '@reduxjs/toolkit';
import { parishionerApi } from 'api/parishioner';
import { parishionerActions } from 'features/parishioner/parishioner-slice';
import {
   ID,
   PaginatedListParams,
   PaginatedListResponse,
   ParishionerBasicResponseDTO,
   ParishionerDetailResponseDTO,
} from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchParishionerList(action: PayloadAction<PaginatedListParams>) {
   try {
      const response: PaginatedListResponse<ParishionerBasicResponseDTO> = yield call(
         parishionerApi.getList,
         action.payload
      );
      yield put(parishionerActions.fetchParishionerListSuccess(response));
   } catch (error) {
      yield put(parishionerActions.fetchParishionerListFailed());
   }
}

function* fetchParishionerDetail(action: PayloadAction<ID>) {
   try {
      const response: ParishionerDetailResponseDTO = yield call(
         parishionerApi.getDetail,
         action.payload
      );
      yield put(parishionerActions.fetchParishionerDetailSuccess(response));
   } catch (error) {
      yield put(parishionerActions.fetchParishionerDetailFailed());
   }
}

export default function* parishionerSaga() {
   yield takeLatest(parishionerActions.fetchParishionerList, fetchParishionerList);
   yield takeLatest(parishionerActions.fetchParishionerDetail, fetchParishionerDetail);
}
