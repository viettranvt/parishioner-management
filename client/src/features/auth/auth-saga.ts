import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { AxiosResponse } from 'axios';
import { LocalStorageItem } from 'constants/local-storage';
import { authActions } from 'features/auth/auth-slice';
import { AuthLoginFormData, AuthLoginResponseDTO } from 'models';
import { push } from 'redux-first-history';
import { delay, fork, take, call, put } from 'redux-saga/effects';

function* handleLogin(payload: AuthLoginFormData) {
   console.log('handle login', payload);

   try {
      // call login api
      const {
         data: { authInfo, token, refreshToken },
      }: AxiosResponse<AuthLoginResponseDTO> = yield call(authApi.login, payload);

      // on login success
      localStorage.setItem(LocalStorageItem.accessToken, token);
      yield put(
         authActions.loginSuccess({
            accessToken: token,
            refreshToken: refreshToken,
            user: {
               id: authInfo.id,
               username: authInfo.username,
            },
         })
      );

      // redirect to private page
      yield put(push('/'));
   } catch (error) {
      // on login failed
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
