'use client';

import React, { useEffect } from 'react';
import useMediaStream from '../hooks/useStream';
import { VideoIcon, VideoOffIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function VideoRecorder() {
  const { streamVideo, permissionDenied } = useMediaStream('camera');

  useEffect(() => {
    if (permissionDenied) {
      toast({
        title: 'Allow camera access',
        description: 'Please allow camera access to record video',
        color: 'red',
      });
    }
  }, [permissionDenied]);

  return (
    <div className="relative border rounded-lg overflow-clip flex items-center justify-center h-1/3 aspect-video">
      <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] -z-10">
        {permissionDenied && (
          <VideoOffIcon className="text-destructive opacity-80" />
        )}
        {!permissionDenied && <VideoIcon className="opacity-50" />}
      </div>

      <video ref={streamVideo}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
