import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { LocalStorageItem } from 'constants/local-storage';
import { authActions } from 'features/auth/auth-slice';
import { AuthLoginFormData, AuthLoginResponseDTO } from 'models';
import { push } from 'redux-first-history';
import { call, delay, fork, put, take } from 'redux-saga/effects';

function* handleLogin(payload: AuthLoginFormData) {
   console.log('handle login', payload);
   try {
      // call login api
      const { authInfo, token, refreshToken }: AuthLoginResponseDTO = yield call(
         authApi.login,
         payload
      );

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
      yield put(authActions.loginFailed('Tên đăng nhập hoặc mật khẩu không chính xác'));
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
      if (isLoggedIn) {
         yield take(authActions.logout.type);
         yield call(handleLogout);
      }

      const action: PayloadAction<AuthLoginFormData> = yield take(authActions.login.type);
      yield call(handleLogin, action.payload);
   }
}

export default function* authSaga() {
   yield fork(watchLoginFlow);
}
