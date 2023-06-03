import { PayloadAction } from '@reduxjs/toolkit';
import { parishionerApi } from 'api/parishioner';
import { PageId, Pages } from 'constants/pages';
import {
   parishionerActions,
   selectParishionerFilter,
} from 'features/parishioner/parishioner-slice';
import {
   ID,
   PaginatedListParams,
   PaginatedListResponse,
   ParishionerBasicResponseDTO,
   ParishionerCreateRequestDTO,
   ParishionerDetailResponseDTO,
   ParishionerUpdateRequestDTO,
} from 'models';
import { toast } from 'react-toastify';
import { push } from 'redux-first-history';
import { call, put, select, takeLatest } from 'redux-saga/effects';

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

function* createParishioner(action: PayloadAction<ParishionerCreateRequestDTO>) {
   try {
      yield call(parishionerApi.create, action.payload);
      yield put(parishionerActions.createParishionerSuccess());
      yield put(push(Pages.get(PageId.ParishionerList)?.path ?? ''));
   } catch (error) {
      yield put(parishionerActions.createParishionerFailed());
   }
}

function* updateParishioner(action: PayloadAction<ParishionerUpdateRequestDTO>) {
   try {
      // Update
      yield call(parishionerApi.update, action.payload);

      // Notify success
      yield put(parishionerActions.updateParishionerSuccess());
      toast.success('Đã lưu thông tin');

      // Reload detail
      yield put(parishionerActions.fetchParishionerDetail(action.payload.id));
   } catch (error) {
      // Notify error
      yield put(parishionerActions.updateParishionerFailed());
      toast.error('Lưu thông tin thất bại');
   }
}

function* deleteParishioner(action: PayloadAction<ID>) {
   try {
      yield call(parishionerApi.delete, action.payload);
      yield put(parishionerActions.deleteParishionerSuccess());
      const filter: PaginatedListParams = yield select(selectParishionerFilter);
      yield put(parishionerActions.fetchParishionerList({ ...filter, page: 1 }));
   } catch (error) {
      yield put(parishionerActions.deleteParishionerFailed());
   }
}

export default function* parishionerSaga() {
   yield takeLatest(parishionerActions.fetchParishionerList, fetchParishionerList);
   yield takeLatest(parishionerActions.fetchParishionerDetail, fetchParishionerDetail);
   yield takeLatest(parishionerActions.createParishioner, createParishioner);
   yield takeLatest(parishionerActions.updateParishioner, updateParishioner);
   yield takeLatest(parishionerActions.deleteParishioner, deleteParishioner);
}
