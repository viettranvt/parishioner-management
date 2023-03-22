import { all } from '@redux-saga/core/effects';
import authSaga from 'features/auth/auth-saga';

export default function* rootSaga() {
   yield all([authSaga()]);
}
