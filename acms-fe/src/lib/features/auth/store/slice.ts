'use client';

import { createSlice } from '@reduxjs/toolkit';

import { Auth, AuthState } from './types';

export const authInitialState: AuthState = {
  user: null,
  loaded: false,
};

const authSlice = createSlice({
  name: Auth,
  initialState: authInitialState,
  reducers: {
    login(state, { payload: { user } }) {
      state.user = user;
    },

    loaded(state) {
      state.loaded = true;
    },

    logout(state) {
      state.user = null;
    },
  },
});

export const { login, loaded, logout } = authSlice.actions;

export default authSlice.reducer;
