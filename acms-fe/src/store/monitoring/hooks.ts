import { extractImageBlob } from '@/lib/image-utils';
import { useAppDispatch, useAppSelector } from '../store';
import {
  useConfirmUploadMutation,
  useGeneratePresignedUploadUrlMutation,
} from './api';
import {
  incrementCapturedCameraCount,
  incrementCapturedScreenCount,
} from './slice';
import { retirableReq } from '@/lib/retirable-req';
import { MonitoringEvents } from './types';

export function useUpload(
  contestId: string,
  contestName: string,
  userName: string,
  maxRetries = 3
) {
  const capturedScreenCount = useAppSelector(
    (state) => state.monitoring.capturedScreenCount
  );
  const capturedCameraCount = useAppSelector(
    (state) => state.monitoring.capturedCameraCount
  );
  const [generatePresignedUploadUrl] = useGeneratePresignedUploadUrlMutation();

  const [confirmUpload] = useConfirmUploadMutation();

  const dispatch = useAppDispatch();

  async function uploadBlob(blob: Blob, prefix: string, count: number) {
    const fileData = new File(
      [blob],
      `${contestName}-${userName}-${prefix}-${count}.jpg`,
      {
        type: 'image/jpeg',
      }
    );

    const response = await generatePresignedUploadUrl({
      fileName: fileData.name,
      contentType: fileData.type,
      action: MonitoringEvents.recordUploaded,
      extra: {
        contest: contestId,
      },
    });

    if (response.error) return;

    const { presignedUrl, confirmationToken } = response.data;

    const uploadResponse = await retirableReq(async () => {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: fileData,
      });
      return response;
    }, maxRetries);

    if (uploadResponse?.status !== 200) return;

    const confirmationResult = await confirmUpload({
      token: confirmationToken,
    });

    if (confirmationResult.error) return;

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
          capturedScreenCount
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
          capturedCameraCount
        );
        if (cameraUploadOk) dispatch(incrementCapturedCameraCount());
      }
    }
  }

  return upload;
}
