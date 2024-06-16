'use client';

import { createSlice } from '@reduxjs/toolkit';

import { Auth, AuthState } from './types';

export const authInitialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: Auth,
  initialState: authInitialState,
  reducers: {
    login(state, { payload: { user } }) {
      state.user = user;
    },

    logout(state) {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
