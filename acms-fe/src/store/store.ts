'use client';

import { useDispatch, useSelector, useStore } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import monitoringReducer from './monitoring/slice';
import { authApi } from './auth/api';
import { contestApi } from './contests/api';
import { issueApi } from './issue/api';
import { monitoringApi } from './monitoring/api';

const rootReducer = combineReducers({
  auth: authReducer,
  monitoring: monitoringReducer,
  [monitoringApi.reducerPath]: monitoringApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [contestApi.reducerPath]: contestApi.reducer,
  [issueApi.reducerPath]: issueApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        contestApi.middleware,
        issueApi.middleware,
        monitoringApi.middleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
