import { retirableReq } from '@/lib/core/utils/retirable-req';
import {
  incrementCapturedScreenCount,
  incrementCapturedCameraCount,
} from '../store/slice';
import { extractImageBlob } from './photo-util';
import { useApi, useAppDispatch, useAppSelector } from '@/lib/core/hooks';
import { MonitoringEvent } from '../events/recording.event';

export const useUpload = (
  contestId: string,
  contestName: string,
  userName: string
) => {
  const client = useApi();

  const screenCount = useAppSelector(
    (state) => state.monitoring.capturedScreenCount
  );
  const cameraCount = useAppSelector(
    (state) => state.monitoring.capturedScreenCount
  );
  const dispatch = useAppDispatch();

  async function uploadBlob(blob: Blob, prefix: string, count: number) {
    const fileData = new File(
      [blob],
      `${contestName}-${userName}-${prefix}-${count}.jpg`,
      {
        type: 'image/jpeg',
      }
    );

    const response = await client.post('/storage/presigned-upload-url', {
      fileName: fileData.name,
      contentType: fileData.type,
      action: MonitoringEvent.recordUploaded,
      extra: {
        contest: contestId,
      },
    });

    if (response.status !== 201) return;

    const { presignedUrl, confirmationToken } = response.data.data;

    // console.log(`Uploading ${prefix}...`);

    const uploadResponse = await retirableReq(async () => {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: fileData,
      });
      return response;
    });

    if (uploadResponse?.status !== 200) return;

    const r = await client.post('/storage/confirm-upload', {
      token: confirmationToken,
    });

    if (r.status !== 201) return;

    // console.log('Upload successful!');
    return true;
  }

  async function upload(
    cameraElement: HTMLVideoElement | null,
    screenElement: HTMLVideoElement | null
  ) {
    if (screenElement) {
      const screenImage = await extractImageBlob(screenElement);
      if (screenImage) {
        const screenUploadOk = await uploadBlob(
          screenImage,
          'screen',
          screenCount
        );
        if (screenUploadOk) {
          dispatch(incrementCapturedScreenCount());
        }
      }
    }

    if (cameraElement) {
      const cameraImage = await extractImageBlob(cameraElement);
      if (cameraImage) {
        const cameraUploadOk = await uploadBlob(
          cameraImage,
          'camera',
          cameraCount
        );
        if (cameraUploadOk) dispatch(incrementCapturedCameraCount());
      }
    }
  }

  return upload;
};
