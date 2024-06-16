export const Monitoring = 'monitoring';
export const GetStream = `${Monitoring}/get`;
export const CloseStream = `${Monitoring}/close`;

export interface MonitoringState {
  hasPermission: boolean | null;
  isRecording: boolean;
}
