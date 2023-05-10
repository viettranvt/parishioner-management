import { all } from '@redux-saga/core/effects';
import authSaga from 'features/auth/auth-saga';
import parishionerSaga from 'features/parishioner/parishioner-saga';

export default function* rootSaga() {
   yield all([authSaga(), parishionerSaga()]);
}
