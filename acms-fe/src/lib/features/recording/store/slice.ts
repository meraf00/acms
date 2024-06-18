'use client';

import { createSlice } from '@reduxjs/toolkit';
import {
  MAX_INTERVAL,
  MIN_INTERVAL,
  Monitoring,
  MonitoringState,
} from './types';

export const monitoringInitialState: MonitoringState = {
  capturedScreenCount: 0,
  capturedCameraCount: 0,
  captureInterval: Math.floor(
    Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL
  ),
};

const monitorSlice = createSlice({
  name: Monitoring,
  initialState: monitoringInitialState,
  reducers: {
    incrementCapturedScreenCount(state) {
      state.capturedScreenCount += 1;
    },

    incrementCapturedCameraCount(state) {
      state.capturedScreenCount += 1;
    },

    setCaptureRate(state, action) {
      state.captureInterval = action.payload;
    },
  },
});

export const {
  incrementCapturedScreenCount,
  incrementCapturedCameraCount,
  setCaptureRate,
} = monitorSlice.actions;

export default monitorSlice.reducer;
