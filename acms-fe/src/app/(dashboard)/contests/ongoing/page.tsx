'use client';

import Loading from '@/components/ui/loading';
import LiveContestCard from '@/lib/features/contest/components/live-contest-card';
import {
  useGetActiveContests,
  useGetUpcomingContests,
} from '@/lib/features/hooks';

export default function ActiveContests() {
  const {
    data: activeContests,
    isLoading: isActiveLoading,
    error: activeError,
  } = useGetActiveContests();
  const {
    data: upcomingContests,
    isLoading: isUpcomingLoading,
    error: upcomingError,
  } = useGetUpcomingContests();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
          Active contests
        </h1>
        <div className="flex w-full overflow-auto gap-5 no-scrollbar">
          {isActiveLoading ? (
            <div className="flex w-full h-[70vh] items-center justify-center">
              <Loading />
            </div>
          ) : activeContests && activeContests.length ? (
            activeContests.map((contest) => (
              <LiveContestCard key={contest._id} contest={contest} />
            ))
          ) : (
            <div className="flex w-full items-center">
              <h1 className="font-bold text-xl mb-10 flex gap-2 items-start opacity-50">
                There are no active contests
              </h1>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
          Upcoming contests
        </h1>
        <div className="flex w-full overflow-auto gap-5 no-scrollbar">
          {isUpcomingLoading ? (
            <div className="flex w-full h-[70vh] items-center justify-center">
              <Loading />
            </div>
          ) : upcomingContests && upcomingContests.length ? (
            upcomingContests.map((contest) => (
              <LiveContestCard
                key={contest._id}
                contest={contest}
                isLive={false}
              />
            ))
          ) : (
            <div className="flex w-full items-center">
              <h1 className="font-bold text-xl mb-10 flex gap-2 items-start opacity-50">
                There are no upcoming contests
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
