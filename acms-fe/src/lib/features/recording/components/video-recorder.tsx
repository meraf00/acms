'use client';

import React, { useEffect, useRef } from 'react';
import { VideoIcon, VideoOffIcon } from 'lucide-react';

export interface VideoRecorderProps {
  stream: MediaStream | null;
  hasPermission: boolean | null;
  allowedIcon?: React.ReactNode;
  deniedIcon?: React.ReactNode;
}

export default function VideoRecorder({
  stream,
  hasPermission,
  allowedIcon = <VideoOffIcon className="text-destructive opacity-80" />,
  deniedIcon = <VideoIcon className="opacity-50" />,
}: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startStream = async () => {
      if (stream) {
        try {
          await videoRef.current?.play();
        } catch (e) {
          console.error('Error playing video', e);
        }
      }
    };
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      startStream();
    }
  }, [stream]);

  return (
    <div className="relative border rounded-lg overflow-clip flex items-center justify-center aspect-video w-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -z-10">
        {hasPermission ? allowedIcon : deniedIcon}
      </div>

      <video ref={videoRef} muted className="w-full">
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
