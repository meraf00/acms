export const Monitoring = 'monitoring';
export const IncrementCapturedCount = `${Monitoring}/increment`;
export const SetCaptureRate = `${Monitoring}/set-capture-rate`;

export type Minutes = number;

export interface MonitoringState {
  captureInterval: Minutes;
  capturedScreenCount: number;
  capturedCameraCount: number;
}

export const MAX_INTERVAL = 15;
export const MIN_INTERVAL = 8;
