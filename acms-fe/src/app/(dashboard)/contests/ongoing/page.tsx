'use client';

import Loading from '@/components/ui/loading';
import LiveContestCard from '@/lib/features/contest/components/live-contest-card';
import { useGetActiveContests } from '@/lib/features/hooks';

export default function ActiveContests() {
  const { data: contests, isLoading, error } = useGetActiveContests();

  return (
    <>
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Active contests
      </h1>
      <div className="flex w-full overflow-auto gap-5 no-scrollbar">
        {isLoading ? (
          <div className="flex w-full h-[70vh] items-center justify-center">
            <Loading />
          </div>
        ) : contests ? (
          contests.map((contest) => (
            <LiveContestCard key={contest._id} contest={contest} />
          ))
        ) : (
          <div className="flex w-full items-center">
            <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start opacity-50">
              There are no active contests
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
