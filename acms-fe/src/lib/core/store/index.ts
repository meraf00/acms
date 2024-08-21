'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/store/slice';
import monitoringReducer from '@features/recording/store/slice';
import { authApi } from '@/lib/features/auth/store/api';
import { contestApi } from '@/lib/features/contest/store/api';

const rootReducer = combineReducers({
  auth: authReducer,
  monitoring: monitoringReducer,
  [authApi.reducerPath]: authApi.reducer,
  [contestApi.reducerPath]: contestApi.reducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, contestApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
