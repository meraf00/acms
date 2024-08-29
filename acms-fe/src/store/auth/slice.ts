'use client';

import { createSlice } from '@reduxjs/toolkit';
import { type Session } from './types';

export const authInitialState: Session = {};

export const Auth = 'auth';
export const LoadAuthState = `${Auth}/load`;
export const SaveAuthState = `${Auth}/save`;

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
