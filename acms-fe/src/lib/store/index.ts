'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import { localStorageMiddleware, reHydrateStore } from './middlewares';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,

    preloadedState: reHydrateStore(),

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
