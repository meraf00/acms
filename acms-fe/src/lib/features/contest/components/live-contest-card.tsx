'use client';

import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useRef } from 'react';
import { Contest } from '../types/contest';
import Link from 'next/link';
import { cn } from '@/lib/core/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ExternalLinkIcon, Monitor } from 'lucide-react';

export interface LiveContestCardProps {
  contest: Contest;
}

export default function LiveContestCard({ contest }: LiveContestCardProps) {
  let timeRef = '';

  const diff = new Date(contest.endingTime).getTime() - Date.now();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours === 0) {
    timeRef = `Ends in ${minutes} minutes`;
  } else if (minutes === 0) {
    timeRef = `Ends in ${hours} hours`;
  } else {
    timeRef = `Ends in ${hours} hours and ${minutes} minutes`;
  }

  return (
    <Card className={cn('w-[380px]', 'bg-background')}>
      <CardHeader>
        <CardTitle>{contest.name}</CardTitle>
        <CardDescription>{timeRef}</CardDescription>
      </CardHeader>

      <CardFooter className="flex gap-5">
        <Link
          href=""
          target="_blank"
          className={cn('w-full', buttonVariants({ variant: 'link' }))}
        >
          <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open contest
        </Link>
        <Button className="w-full">
          <Monitor className="mr-2 h-4 w-4" /> Start monitoring
        </Button>
      </CardFooter>
    </Card>
  );
}
