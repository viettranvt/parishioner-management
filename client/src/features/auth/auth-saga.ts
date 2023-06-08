import { PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'api';
import { LocalStorageItem } from 'constants/local-storage';
import { PageId, Pages } from 'constants/pages';
import { ErrorMessages, ErrorType } from 'constants/strings';
import { authActions } from 'features/auth/auth-slice';
import { AuthLoginFormData, AuthLoginResponseDTO } from 'models';
import { toast } from 'react-toastify';
import { push } from 'redux-first-history';
import { call, fork, put, take } from 'redux-saga/effects';

function* handleLogin(payload: AuthLoginFormData) {
   console.log('handle login', payload);
   try {
      const { authInfo, token, refreshToken }: AuthLoginResponseDTO = yield call(
         authApi.login,
         payload
      );

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

      yield put(push('/'));
   } catch (error) {
      const msg = ErrorMessages[ErrorType.LogInFailed];
      yield put(authActions.loginFailed(msg));
      toast.error(msg, { position: 'top-center' });
   }
}

function* handleLogout() {
   localStorage.removeItem(LocalStorageItem.accessToken);
   yield put(push(Pages.get(PageId.Login)?.path ?? ''));
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
