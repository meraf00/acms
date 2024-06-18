import { z } from 'zod';

export const RecordUploaded = 'monitoring.record.upload';

export const recordingUploadedEvent = z
  .object({
    extra: z.object({
      user: z.string(),
      contest: z.string(),
    }),
    fileId: z.string(),
  })
  .required();

export type RecordingUploadedEvent = z.infer<typeof recordingUploadedEvent>;
