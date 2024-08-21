'use client';

import { useAppSelector } from '@/lib/core/hooks';
import { cn } from '@/lib/core/utils';
import { ContestForm } from '@/lib/features/contest/components/contest-form';
import { useGetContestQuery } from '@/lib/features/contest/store/api';

import { useParams } from 'next/navigation';
import React from 'react';

export default function EditContest() {
  const params = useParams();

  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetContestQuery(params.id as string, {
    skip: !user,
  });

  return (
    <div className="pr-24">
      <h1
        className={cn(
          'font-bold text-2xl mb-10 flex gap-2 items-start',
          isLoading ? 'animate-pulse' : ''
        )}
      >
        Edit contest
      </h1>

      <div className={cn('h-screen', isLoading ? 'animate-pulse' : '')}>
        {data && <ContestForm contest={data} />}
      </div>
    </div>
  );
}
