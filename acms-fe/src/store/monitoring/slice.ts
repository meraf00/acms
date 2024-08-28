'use client';

import { createSlice } from '@reduxjs/toolkit';
import { MonitoringState } from './types';

export const Monitoring = 'monitoring';
export const IncrementCapturedCount = `${Monitoring}/increment`;
export const SetCaptureRate = `${Monitoring}/set-capture-rate`;
export const MAX_INTERVAL = 15;
export const MIN_INTERVAL = 8;

export const monitoringInitialState: MonitoringState = {
  capturedScreenCount: 0,
  capturedCameraCount: 0,
  captureInterval: Math.floor(
    (Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL) * 60000
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

    setCaptureRate(state, action: { payload: number }) {
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
