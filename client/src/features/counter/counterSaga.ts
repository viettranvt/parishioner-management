import { takeEvery } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { increment } from 'features/counter/counterSlice';

export function* log(action: PayloadAction) {
   console.log('Log', action);
}

export default function* counterSaga() {
   console.log('Counter saga');

   //    yield takeEvery('*', log);
   yield takeEvery(increment().type, log);
}
