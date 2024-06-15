'use client';

import Loading from '@/components/ui/loading';
import { Skeleton } from '@/components/ui/skeleton';
import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { ContestsTable } from '@/lib/features/contest/components/contest-table';

import { useGetContests } from '@/lib/features/hooks';
import React from 'react';

export function ContestsPage() {
  const { data, isLoading, error } = useGetContests();

  return (
    <div>
      {isLoading && (
        <div className="flex w-full h-screen items-center justify-center">
          <Loading />
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {data && <ContestsTable contests={data} />}
    </div>
  );
}

export default AuthGuard({ Component: ContestsPage, allowedRoles: ['hoe'] });
