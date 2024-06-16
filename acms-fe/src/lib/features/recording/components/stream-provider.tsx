import { ReactNode, createContext, useContext, useState } from 'react';

interface StreamContextInterface {
  cameraStream: MediaStream | null;
  screenStream: MediaStream | null;
  isRecording: boolean;
  hasPermission: boolean | null;
  startRecording: () => void;
}

const StreamContext = createContext<StreamContextInterface>({
  cameraStream: null,
  screenStream: null,
  isRecording: false,
  hasPermission: null,
  startRecording: () => {},
});

export const useStreamContext = () => {
  const context = useContext(StreamContext);

  if (context === undefined) {
    throw new Error('useStreamContext must be used within a StreamProvider');
  }

  return context;
};

export default function StreamProvider({ children }: { children: ReactNode }) {
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const startRecording = async () => {
    try {
      let camera = await getCamera();
      setCameraStream((prev) => {
        if (prev) {
          prev.getTracks().forEach((track) => {
            track.stop();
          });
        }
        return camera;
      });
    } catch (e: any) {
      if (e.name === 'NotAllowedError') {
        setHasPermission(false);
        return;
      }
    }

    try {
      let screen = await getScreen();
      setScreenStream((prev) => {
        if (prev) {
          prev.getTracks().forEach((track) => {
            track.stop();
          });
        }
        return screen;
      });
    } catch (e: any) {
      if (e.name === 'NotAllowedError') {
        setHasPermission(false);
        return;
      }
    }

    setIsRecording(true);
    setHasPermission(true);
  };

  return (
    <StreamContext.Provider
      value={{
        cameraStream,
        screenStream,
        isRecording,
        hasPermission,
        startRecording,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
}

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
