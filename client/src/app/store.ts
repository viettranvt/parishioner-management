import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSaga from 'app/rootSaga';
import authReducer from 'features/auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import counterReducer from '../features/counter/counterSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
   reducer: {
      counter: counterReducer,
      auth: authReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         thunk: true,
         serializableCheck: true,
         immutableCheck: true,
      }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga); // must be provided after 'configureStore' has been called

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
