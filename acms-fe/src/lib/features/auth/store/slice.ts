'use client';

import { createSlice } from '@reduxjs/toolkit';

import { Auth, AuthState } from './types';

export const authInitialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: Auth,
  initialState: authInitialState,
  reducers: {
    login(state, { payload: { token, user } }) {
      state.token = token;
      state.user = user;
    },

    logout(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
