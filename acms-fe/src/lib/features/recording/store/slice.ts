'use client';

import { createSlice } from '@reduxjs/toolkit';

import { Monitoring, MonitoringState } from './types';

export const monitoringInitialState: MonitoringState = {
  hasPermission: null,
  isRecording: false,
};

const monitorSlice = createSlice({
  name: Monitoring,
  initialState: monitoringInitialState,
  reducers: {
    updateStream(state, { payload }: { payload: Partial<MonitoringState> }) {
      const { isRecording, hasPermission } = payload;
      state.isRecording = isRecording ?? state.isRecording;
      state.hasPermission = hasPermission ?? state.hasPermission;
    },

    close(state) {
      state.hasPermission = null;
      state.isRecording = false;
    },
  },
});

export const { updateStream, close } = monitorSlice.actions;

export default monitorSlice.reducer;
