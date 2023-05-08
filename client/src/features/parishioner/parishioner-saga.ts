import { PayloadAction } from '@reduxjs/toolkit';
import { parishionerApi } from 'api/parishioner';
import { parishionerActions } from 'features/parishioner/parishioner-slice';
import {
   ID,
   PaginatedListParams,
   PaginatedListResponse,
   ParishionerBasicResponseDTO,
   ParishionerDetailResponseDTO,
   ParishionerUpdateRequestDTO,
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

function* updateParishioner(action: PayloadAction<ParishionerUpdateRequestDTO>) {
   try {
      yield call(parishionerApi.update, action.payload);
      yield put(parishionerActions.updateParishionerSuccess());
      yield put(parishionerActions.fetchParishionerDetail(action.payload.id));
   } catch (error) {
      yield put(parishionerActions.updateParishionerFailed());
   }
}

export default function* parishionerSaga() {
   yield takeLatest(parishionerActions.fetchParishionerList, fetchParishionerList);
   yield takeLatest(parishionerActions.fetchParishionerDetail, fetchParishionerDetail);
   yield takeLatest(parishionerActions.updateParishioner, updateParishioner);
}
