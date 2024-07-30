"use client";

import Loading from "@/components/ui/loading";
import LiveContestCard from "@/lib/features/contest/components/live-contest-card";
import { PastContestsTable } from "@/lib/features/contest/components/past-contest-table";
import {
  useGetActiveContests,
  useGetPastContests,
  useGetUpcomingContests,
} from "@/lib/features/hooks";
import LiveContestCardSkeleton from "@lib/features/contest/components/skeletons/live-contest-card-skeleton";
import { PastContestsTableSkeleton } from "@lib/features/contest/components/skeletons/past-contest-table-skeleton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ActiveContests() {
  const router = useRouter();
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
  const {
    data: pastContests,
    isLoading: isPastLoading,
    error: pastError,
  } = useGetPastContests();

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeContests) {
        const activeDiff =
          new Date(activeContests[0].endingTime).getTime() - Date.now();

        if (activeDiff < 0) {
          router.refresh();
          clearInterval(interval);
        }
      }

      if (upcomingContests) {
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
  const isLoading = true;
  return (
    <div className="space-y-10 mb-32 mr-2">
      <div>
        <h1 className="font-bold text-xl mb-2 flex gap-2 items-start ">
          Active Contests
        </h1>
        <hr className="mb-12 h-0.5 border-t-0 bg-neutral-200 dark:bg-white/10 " />
        <div className="flex w-full overflow-auto gap-10 no-scrollbar px-6 pb-8 pr-24 ">
          {isActiveLoading ? (
            // <div className="flex w-full h-[70vh] items-center justify-center">
            //   <Loading />
            // </div>
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
