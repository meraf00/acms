'use client';

import { Skeleton } from '@/components/ui/skeleton';
import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { ContestCard } from '@/lib/features/contest/components/contest-card';
import { useGetContests } from '@/lib/features/hooks';
import React from 'react';

export function ContestsPage() {
  const { data, isLoading, error } = useGetContests();

  return (
    <div>
      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <ContestSkeleton />
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {data && (
        <ContestCard
          contest={{
            id: '12345',
            name: 'A2SV Contest #2',
            startingTime: new Date(),
            endingTime: new Date(),
            students: [],
          }}
        />
      )}
    </div>
  );
}

function ContestSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default AuthGuard({ Component: ContestsPage, allowedRoles: ['hoe'] });
