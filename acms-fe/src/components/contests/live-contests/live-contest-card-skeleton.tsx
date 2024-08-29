'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { useAppSelector } from '@/store/store';
import { Roles } from '@/store/auth/types';

export default function LiveContestCardSkeleton({
  isUpcoming,
}: {
  isUpcoming: boolean;
}) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Card
      className={` ${cn(
        'w-[420px]',
        'bg-background min-w-[420px] overflow-hidden rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,_0.08)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] border-0 h-64 flex flex-col justify-between'
      )}`}
    >
      <CardContent className="max-h-44 overflow-hidden">
        <Skeleton className="w-full h-44 rounded-none" />
      </CardContent>
      <div className="flex justify-between ">
        <CardHeader className="py-4 pl-5 flex flex-col items-start justify-center">
          <Skeleton className="w-40 h-5" />
          <Skeleton className="w-32 h-3" />
        </CardHeader>

        <CardFooter className="flex flex-col px-0 py-4 mr-3 gap-2 max-w-44 items-start justify-end">
          <Skeleton className="w-32 h-8" />
          {user?.role !== Roles.student || isUpcoming ? null : (
            <Skeleton className="w-32 h-8" />
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
