export type MonitoringEvent = 'monitoring.record.uploaded';

export const MonitoringEvents: {
  [key: string]: MonitoringEvent;
} = {
  recordUploaded: 'monitoring.record.uploaded',
};

export type Minutes = number;

export interface MonitoringState {
  captureInterval: Minutes;
  capturedScreenCount: number;
  capturedCameraCount: number;
}

export type CapturedImage = string;

export interface GetContestImagesDto {
  contestId: string;
  contestantId: string;
}

export interface PresignedUrlDto {
  presignedUrl: string;
  confirmationToken: string;
}

export interface ImageMetadataDto {
  fileName: string;
  contentType: string;
  action: MonitoringEvent;
  extra: {
    contest: string;
  };
}

export interface UploadFileDto {
  presignedUrl: string;
  file: File;
}

export interface UploadConfirmationDto {
  token: string;
}
