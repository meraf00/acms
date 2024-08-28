export const MonitoringEvent = {
  recordUploaded: 'monitoring.record.uploaded',
};

export type CapturedImage = string;

export interface GetContestImagesDto {
  contestId: string;
  contestantId: string;
}
