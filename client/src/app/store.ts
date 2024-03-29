import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rootSaga from 'app/root-saga';
import authReducer from 'features/auth/auth-slice';
import parishionerReducer from 'features/parishioner/parishioner-slice';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import createSagaMiddleware from 'redux-saga';

const { createReduxHistory, routerReducer, routerMiddleware } = createReduxHistoryContext({
   history: createBrowserHistory(),
});

const rootReducer = combineReducers({
   router: routerReducer,
   auth: authReducer,
   parishioner: parishionerReducer,
});

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         thunk: true,
         serializableCheck: true,
         immutableCheck: true,
      }).concat(sagaMiddleware, routerMiddleware),
});
sagaMiddleware.run(rootSaga); // must be provided after 'configureStore' has been called

export const history = createReduxHistory(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
