import { PayloadAction } from '@reduxjs/toolkit';
import { authActions } from 'features/auth/authSlice';
import { AuthLoginFormData } from 'models';
import { fork, take } from 'redux-saga/effects';

function* handleLogin(payload: AuthLoginFormData) {
   console.log('Handle login', payload);
}

function* handleLogout() {
   console.log('Handle logout');
}

function* watchLoginFlow() {
   while (true) {
      const action: PayloadAction<AuthLoginFormData> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);

      yield take(authActions.logout.type);
      yield fork(handleLogout);
   }
}

export default function* authSaga() {
   yield fork(watchLoginFlow);
}
