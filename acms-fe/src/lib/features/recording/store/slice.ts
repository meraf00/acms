'use client';

import { createSlice } from '@reduxjs/toolkit';
import {
  MAX_INTERVAL,
  MIN_INTERVAL,
  Monitoring,
  MonitoringState,
} from './types';

export const monitoringInitialState: MonitoringState = {
  capturedCount: 0,
  captureInterval: Math.floor(
    Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL
  ),
};

const monitorSlice = createSlice({
  name: Monitoring,
  initialState: monitoringInitialState,
  reducers: {
    incrementCapturedCount(state) {
      state.capturedCount += 1;
    },

    setCaptureRate(state, action) {
      state.captureInterval = action.payload;
    },
  },
});

export const { incrementCapturedCount, setCaptureRate } = monitorSlice.actions;

export default monitorSlice.reducer;
