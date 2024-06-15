'use client';

import React from 'react';
import useMediaStream from '../hooks/useStream';
import { ScreenShareOffIcon } from 'lucide-react';

export default function ScreenRecorder() {
  const { streamVideo } = useMediaStream('screen');

  return (
    <div className="relative border rounded-lg overflow-clip  flex justify-center items-center aspect-video">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -z-10">
        <ScreenShareOffIcon className="text-destructive opacity-80" />
      </div>
      <video ref={streamVideo}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
