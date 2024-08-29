export const extractImageBlob = (
  video: HTMLVideoElement
): Promise<Blob | null> => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  context?.drawImage(video, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
};
