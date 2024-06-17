import { incrementCapturedCount } from '../store/slice';
import { extractImageBlob } from './photo-util';
import { useApi, useAppDispatch, useAppSelector } from '@/lib/core/hooks';

export const useUpload = () => {
  const client = useApi();

  const count = useAppSelector((state) => state.monitoring.capturedCount);
  const dispatch = useAppDispatch();

  async function upload(
    cameraElement: HTMLVideoElement | null,
    screenElement: HTMLVideoElement | null
  ) {
    if (!cameraElement || !screenElement) return;

    const cameraImage = await extractImageBlob(cameraElement);
    const screenImage = await extractImageBlob(screenElement);

    if (!screenImage) return;

    const fileData = new File([screenImage], `screen-${count}.jpg`, {
      type: 'image/jpeg',
    });

    const response = await client.post('/storage/presigned-upload-url', {
      fileName: fileData.name,
      contentType: fileData.type,
    });

    if (response.status !== 201) return;

    const presignedUrl = response.data.data;

    console.log('Uploading image...');
    console.log(response.data.data);
    const uploadResponse = await client.put(
      'http://localhost:8333/a2sv-cms-images/screen-7-1718655702492-21a1f57e-5095-4f3b-a5e4-ea16b8f1ddc0.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=access-key%2F20240617%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240617T202142Z&X-Amz-Expires=100&X-Amz-Signature=87fe98b1a06581ff0db8a710f7b2d3bc355b1ebb0d196236624d6917342aa853&X-Amz-SignedHeaders=host&x-id=PutObject',
      fileData,
      {
        withCredentials: false,
      }
    );

    if (uploadResponse.status !== 200) return;
    dispatch(incrementCapturedCount());
    console.log('Upload successful!');
  }

  return upload;
};
