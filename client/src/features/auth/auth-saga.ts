import { PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageItem } from 'constants/local-storage';
import { authActions } from 'features/auth/auth-slice';
import { AuthLoginFormData } from 'models';
import { push } from 'redux-first-history';
import { delay, fork, take, call, put } from 'redux-saga/effects';

function* handleLogin(payload: AuthLoginFormData) {
   console.log('handle login', payload);

   try {
      // call login api
      yield delay(1000);

      // on login success
      localStorage.setItem(LocalStorageItem.accessToken, 'fake_at');
      yield put(
         authActions.loginSuccess({
            accessToken: 'fake_at',
            refreshToken: 'fake_rf',
            user: {
               id: 1,
               username: 'tuevo',
            },
         })
      );

      // redirect to private page
      yield put(push('/'));
   } catch (error) {
      yield put(authActions.loginFailed('login failed'));
   }
}

function* handleLogout() {
   console.log('handle logout');

   // call logout api
   yield delay(1000);
   localStorage.removeItem(LocalStorageItem.accessToken);

   // redirect to login page
}

function* watchLoginFlow() {
   while (true) {
      console.log('watch login');
      const isLoggedIn = Boolean(localStorage.getItem(LocalStorageItem.accessToken));

      if (!isLoggedIn) {
         const action: PayloadAction<AuthLoginFormData> = yield take(authActions.login.type);
         yield fork(handleLogin, action.payload);
      }

      yield take(authActions.logout.type);
      yield call(handleLogout);
   }
}

export default function* authSaga() {
   yield fork(watchLoginFlow);
}
