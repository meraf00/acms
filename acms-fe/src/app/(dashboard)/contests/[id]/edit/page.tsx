'use client';

import { cn } from '@/lib/core/utils';
import { ContestForm } from '@/lib/features/contest/components/contest-form';
import { useGetContest } from '@/lib/features/hooks';
import { useParams } from 'next/navigation';
import React from 'react';

export default function EditContest() {
  const params = useParams();

  const { data, isLoading, error } = useGetContest(params.id as string);

  return (
    <div className="">
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
