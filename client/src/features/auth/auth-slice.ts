import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { AuthLoginData, AuthLoginFormData, AuthUserData } from 'models';

export interface AuthState {
   isLoggedIn: boolean;
   logging: boolean;
   currentUser?: AuthUserData;
}

const initialState: AuthState = {
   isLoggedIn: false,
   logging: false,
   currentUser: undefined,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      login(state, action: PayloadAction<AuthLoginFormData>) {
         state.logging = false;
      },
      loginSuccess(state, action: PayloadAction<AuthLoginData>) {
         state.logging = false;
         state.isLoggedIn = true;
         state.currentUser = action.payload.user;
      },
      loginFailed(state, action: PayloadAction<string>) {
         state.logging = false;
      },

      logout(state) {
         state.isLoggedIn = false;
         state.currentUser = undefined;
      },
   },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectLogging = (state: RootState) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
