'use client';

import { Middleware } from '@reduxjs/toolkit';

const stateCacheKey = 'acms-application-state';

export const reHydrateStore = () => {
  if (typeof localStorage === 'undefined') return undefined;

  const state = localStorage.getItem(stateCacheKey);
  if (state) {
    return JSON.parse(state);
  }

  return undefined;
};

export const localStorageMiddleware: Middleware<{}, any> = (storeApi) => {
  return (next) => (action) => {
    const result = next(action);
    const state = storeApi.getState();
    localStorage.setItem(stateCacheKey, JSON.stringify(state));
    return result;
  };
};
