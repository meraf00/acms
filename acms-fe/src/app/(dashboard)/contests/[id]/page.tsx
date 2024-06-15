'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useGetContest } from '@/lib/features/hooks';
import Loading from '@/components/ui/loading';

export default function Contest() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetContest(id as string);

  console.log(data);

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loading />
      </div>
    );

  return <div className=""></div>;
}
