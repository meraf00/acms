'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { useGetActiveContestsQuery, useGetPastContestsQuery, useGetUpcomingContestsQuery } from '@/store/contests/api';
import LiveContestCardSkeleton from '@/components/contests/live-contests/live-contest-card-skeleton';
import LiveContestCard from '@/components/contests/live-contests/live-contest-card';
import { PastContestsTableSkeleton } from '@/components/contests/past-contests/past-contest-table-skeleton';
import { PastContestsTable } from '@/components/contests/past-contests/past-contest-table';

export default function ActiveContests() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const {
    data: activeContests,
    isLoading: isActiveLoading,
  } = useGetActiveContestsQuery(undefined, { skip: !user });
  const {
    data: upcomingContests,
    isLoading: isUpcomingLoading,
  } = useGetUpcomingContestsQuery(undefined, { skip: !user });
  const {
    data: pastContests,
    isLoading: isPastLoading,
  } = useGetPastContestsQuery(undefined, { skip: !user });

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeContests && activeContests.length !== 0) {
        const activeDiff =
          new Date(activeContests[0].endingTime).getTime() - Date.now();

        if (activeDiff < 0) {
          router.refresh();
          clearInterval(interval);
        }
      }

      if (upcomingContests && upcomingContests.length !== 0) {
        const upcomingDiff =
          new Date(upcomingContests[0].startingTime).getTime() - Date.now();

        if (upcomingDiff < 0) {
          router.refresh();
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeContests, upcomingContests, router]);

  return (
    <div className="space-y-10 mb-32 mr-2">
      <div>
        <h1 className="font-bold text-xl mb-2 flex gap-2 items-start ">
          Active Contests
        </h1>
        <hr className="mb-12 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10 " />
        <div className="flex w-full overflow-auto gap-10 no-scrollbar px-6 pb-8 pr-24 ">
          {isActiveLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <LiveContestCardSkeleton key={i} isUpcoming={false} />
            ))
          ) : activeContests && activeContests.length ? (
            activeContests.map((contest) => (
              <LiveContestCard key={contest._id} contest={contest} />
            ))
          ) : (
            <div className="flex w-full items-center">
              <h1 className="font-medium text-sm flex gap-2 items-start opacity-50">
                There are no active contests.
              </h1>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl mt-12 mb-2 flex gap-2 items-start">
          Upcoming Contests
        </h1>
        <hr className="mb-12 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10 " />
        <div className="flex w-full overflow-auto gap-10 no-scrollbar px-6 pb-8 pr-24 ">
          {isUpcomingLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <LiveContestCardSkeleton key={i} isUpcoming={true} />
            ))
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
              <h1 className="font-medium text-sm flex gap-2 items-start opacity-50">
                There are no upcoming contests.
              </h1>
            </div>
          )}
        </div>
        <h1 className="font-bold text-xl mt-12 mb-2 flex gap-2 items-start ">
          Past Contests
        </h1>
        <hr className="mb-12 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10 " />
        <div className="flex w-full">
          {isPastLoading ? (
            <PastContestsTableSkeleton />
          ) : pastContests && pastContests.length ? (
            <PastContestsTable contests={pastContests} />
          ) : (
            <div className="flex w-full items-center">
              <h1 className="font-medium text-sm flex gap-2 items-start opacity-50">
                There are no past contests.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
