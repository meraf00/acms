import { useEffect, useRef, useState } from 'react';

export type MediaStreamType = 'camera' | 'screen';

const getCamera = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: {
      height: 720,
      width: 1280,
    },
    audio: false,
  });
};

const getScreen = async () => {
  return await navigator.mediaDevices.getDisplayMedia({
    video: {
      displaySurface: 'monitor',
    },
    audio: false,
  });
};

const useMediaStream = (type: MediaStreamType) => {
  const streamVideo = useRef<HTMLVideoElement>(null);
  const [track, setTrack] = useState<MediaStreamTrack | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const startRecording = async () => {
      try {
        const stream =
          type === 'camera' ? await getCamera() : await getScreen();

        setTrack(stream.getVideoTracks()[0]);

        if (streamVideo.current) {
          streamVideo.current.srcObject = stream;
          streamVideo.current.play();
        }
      } catch (e: any) {
        if (e.name === 'NotAllowedError') {
          setPermissionDenied(true);
        }
        setError(e);
      }
    };

    startRecording();
  }, [type]);

  return {
    streamVideo,
    track,
    permissionDenied,
    error,
  };
};

export default useMediaStream;
