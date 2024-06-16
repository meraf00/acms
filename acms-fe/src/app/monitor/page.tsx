import ScreenRecorder from '@/lib/features/recording/components/screen-recorder';
import VideoRecorder from '@/lib/features/recording/components/video-recorder';

export default function Monitor() {
  return (
    <div className="min-h-screen flex justify-center items-center gap-5 flex-wrap p-5">
      <div className="lg:w-[40%]">
        <VideoRecorder />
      </div>
      <div className="lg:w-[40%]">
        <ScreenRecorder />
      </div>
    </div>
  );
}
