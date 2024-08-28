'use client';

import { useStreamContext } from '@/components/monitoring/stream-provider';
import { VideoRecorder } from '@/components/monitoring/video-recorder';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

import { useGetActiveContestQuery } from '@/store/contests/api';
import { useUpload } from '@/store/monitoring/hooks';
import { useAppSelector } from '@/store/store';

import { ScreenShareIcon, ScreenShareOffIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function Monitor() {
  const params = useParams();
  const { id: contestId } = params;
  const user = useAppSelector((state) => state.auth.user);
  const { data: contest } = useGetActiveContestQuery(contestId as string, {
    skip: !user,
  });
  const cameraRef = useRef<HTMLVideoElement>(null);
  const screenRef = useRef<HTMLVideoElement>(null);
  const upload = useUpload(
    contestId as string,
    contest?.name ?? '',
    user?.name ?? ''
  );
  const captureInterval = useAppSelector(
    (state) => state.monitoring.captureInterval
  );

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

  useEffect(() => {
    const timer = setInterval(() => {
      upload(cameraRef.current, screenRef.current);
    }, captureInterval);

    return () => clearTimeout(timer);
  }, [upload, captureInterval]);

  return (
    <div className="pr-20">
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Monitoring {trackedContest && trackedContest.name}
      </h1>

      <div className="flex in gap-5 flex-wrap">
        <div className="lg:w-[48%]">
          <VideoRecorder
            ref={cameraRef}
            stream={cameraStream}
            hasPermission={hasPermission}
          />
        </div>
        <div className="lg:w-[48%]">
          <VideoRecorder
            ref={screenRef}
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

        <Button
          className="hidden"
          onClick={() => upload(cameraRef.current, screenRef.current)}
        ></Button>
      </div>
    </div>
  );
}
