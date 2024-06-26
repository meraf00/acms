import { cn } from '@/lib/core/utils';
import { ContestForm } from '@/lib/features/contest/components/contest-form';
import { useGetContest } from '@/lib/features/hooks';
import { useParams } from 'next/navigation';
import React from 'react';

export default function EditContest() {
  const params = useParams();

  const { data, isLoading, error } = useGetContest(params.id as string);

  return (
    <div className="min">
      <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
        Edit contest
      </h1>

      <div className={cn('h-screen', isLoading ? 'animate-pulse' : '')}>
        <ContestForm contest={data ?? undefined} />
      </div>
    </div>
  );
}
