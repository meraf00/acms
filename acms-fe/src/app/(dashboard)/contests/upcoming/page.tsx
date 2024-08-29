'use client';

import { ContestsTable } from '@/components/contests/contest-table';
import Loading from '@/components/ui/loading';
import { useGetUpcomingContestsQuery } from '@/store/contests/api';
import { useAppSelector } from '@/store/store';

import React from 'react';

export default function UpcomingContestsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetUpcomingContestsQuery(undefined, {
    skip: !user,
  });

  return (
    <div>
      {isLoading && (
        <div className="flex w-full h-[80vh] items-center justify-center">
          <Loading />
        </div>
      )}
      {error && <div>Error: {'error'}</div>}
      {data && <ContestsTable contests={data} />}
    </div>
  );
}
