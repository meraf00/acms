'use client';

import React, { useEffect } from 'react';
import { VideoIcon, VideoOffIcon } from 'lucide-react';

export interface VideoRecorderProps {
  stream: MediaStream | null;
  hasPermission: boolean | null;
  allowedIcon?: React.ReactNode;
  deniedIcon?: React.ReactNode;
}

export const VideoRecorder = React.forwardRef(function (
  props: VideoRecorderProps,
  ref: any
) {
  const {
    stream,
    hasPermission,
    allowedIcon = <VideoOffIcon className="text-destructive opacity-80" />,
    deniedIcon = <VideoIcon className="opacity-50" />,
  } = props;

  useEffect(() => {
    const startStream = async () => {
      if (stream) {
        try {
          await ref?.current?.play();
        } catch (e) {
          console.error('Error playing video', e);
        }
      }
    };
    if (ref?.current) {
      ref.current.srcObject = stream;
      startStream();
    }
  }, [stream, ref]);

  return (
    <div className="relative border rounded-lg overflow-clip flex items-center justify-center aspect-video w-full">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -z-10">
        {hasPermission ? allowedIcon : deniedIcon}
      </div>

      <video ref={ref} muted className="w-full">
        Your browser does not support the video tag.
      </video>
    </div>
  );
});

VideoRecorder.displayName = 'VideoRecorder';
