'use client';

import { toast } from '@/components/ui/use-toast';
import { useGetContest } from '@/lib/features/hooks';
import { useStreamContext } from '@/lib/features/recording/components/stream-provider';
import VideoRecorder from '@/lib/features/recording/components/video-recorder';

import { ScreenShareIcon, ScreenShareOffIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Monitor() {
  const params = useParams();
  const { id: contestId } = params;
  const { data: contest } = useGetContest(contestId as string);

  const {
    screenStream,
    cameraStream,
    hasPermission,
    trackedContest,
    isRecording,
    startRecording,
    stopRecording,
  } = useStreamContext();

  useEffect(() => {
    if (!hasPermission) {
      toast({
        title: 'Allow camera access',
        description: 'Please allow camera access to record video',
      });
    }
  }, [hasPermission]);

  useEffect(() => {
    if (isRecording) {
      if (contestId !== trackedContest?._id) {
        toast({
          title: 'Monitoring already in progress',
          description: 'Switching to new contest...',
        });
        stopRecording();
      }
      return;
    }

    if (contest) startRecording(contest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecording, contest]);

  return (
    <>
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Monitoring {trackedContest && trackedContest.name}
      </h1>

      <div className="flex in gap-5 flex-wrap">
        <div className="lg:w-[48%]">
          <VideoRecorder stream={cameraStream} hasPermission={hasPermission} />
        </div>
        <div className="lg:w-[48%]">
          <VideoRecorder
            stream={screenStream}
            hasPermission={hasPermission}
            allowedIcon={
              <ScreenShareIcon className="text-success opacity-80" />
            }
            deniedIcon={
              <ScreenShareOffIcon className="text-destructive opacity-80" />
            }
          />
        </div>
      </div>
    </>
  );
}