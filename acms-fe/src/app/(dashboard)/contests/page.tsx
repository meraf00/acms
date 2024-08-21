'use client';

import Loading from '@/components/ui/loading';
import { useAppSelector } from '@/lib/core/hooks';
import { ContestsTable } from '@/lib/features/contest/components/contest-table';
import { useGetContestsQuery } from '@/lib/features/contest/store/api';
import React from 'react';

export default function ContestsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetContestsQuery(undefined, {
    skip: !user,
  });

  return (
    <div>
      {isLoading && (
        <div className="flex w-full h-[80vh] items-center justify-center">
          <Loading />
        </div>
      )}
      {error && <div>Error: An Error Occurred</div>}
      {data && <ContestsTable contests={data} />}
    </div>
  );
}
