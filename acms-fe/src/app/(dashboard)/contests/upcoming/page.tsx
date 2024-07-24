'use client';

import Loading from '@/components/ui/loading';
import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { ContestsTable } from '@/lib/features/contest/components/contest-table';

import { useGetUpcomingContests } from '@/lib/features/hooks';
import React from 'react';

function UpcomingContestsPage() {
  const { data, isLoading, error } = useGetUpcomingContests();

  return (
    <div>
      {isLoading && (
        <div className="flex w-full h-[80vh] items-center justify-center">
          <Loading />
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {data && <ContestsTable contests={data} />}
    </div>
  );
}

export default AuthGuard({
  Component: UpcomingContestsPage,
  allowedRoles: ['hoe', 'hoa', 'acms'],
});
