'use client';

import { createSlice } from '@reduxjs/toolkit';

import { Auth, AuthState } from './types';

export const authInitialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: Auth,
  initialState: authInitialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },

    setToken(state, { payload }) {
      state.token = payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;

export default authSlice.reducer;
