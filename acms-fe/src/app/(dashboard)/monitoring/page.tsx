'use client';

import { toast } from '@/components/ui/use-toast';
import { useStreamContext } from '@/lib/features/recording/components/stream-provider';
import VideoRecorder from '@/lib/features/recording/components/video-recorder';

import { ScreenShareIcon, ScreenShareOffIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Monitor() {
  const {
    screenStream,
    cameraStream,
    hasPermission,
    startRecording,
    isRecording,
  } = useStreamContext();

  useEffect(() => {
    if (!hasPermission) {
      toast({
        title: 'Allow camera access',
        description: 'Please allow camera access to record video',
        color: 'red',
      });
    }
  }, [hasPermission]);

  useEffect(() => {
    if (isRecording) return;
    startRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording]);

  return (
    <div className="flex in gap-5 flex-wrap">
      <div className="lg:w-[48%]">
        <VideoRecorder stream={cameraStream} hasPermission={hasPermission} />
      </div>
      <div className="lg:w-[48%]">
        <VideoRecorder
          stream={screenStream}
          hasPermission={hasPermission}
          allowedIcon={<ScreenShareIcon className="text-success opacity-80" />}
          deniedIcon={
            <ScreenShareOffIcon className="text-destructive opacity-80" />
          }
        />
      </div>
    </div>
  );
}
