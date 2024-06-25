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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';

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
    <Tooltip>
      <TooltipTrigger>
        <Card className={cn('w-[380px]', 'bg-background')}>
          <CardHeader>
            <CardTitle className="text-ellipsis w-full text-nowrap overflow-hidden">
              {contest.name}
            </CardTitle>
            <CardDescription>{timeRef}</CardDescription>
          </CardHeader>

          <CardFooter className="flex gap-5">
            <Link
              href={`https://codeforces.com/gym/${contest.id}`}
              target="_blank"
              className={cn('w-full', buttonVariants({ variant: 'link' }))}
            >
              <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open contest
            </Link>
            <Link
              href={`/monitoring/${contest._id}`}
              className={cn(buttonVariants({ variant: 'default' }), 'w-full')}
            >
              <Monitor className="mr-2 h-4 w-4" /> Start monitoring
            </Link>
          </CardFooter>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="text-sm bg-background text-muted-foreground ">
        {contest.name}
      </TooltipContent>
    </Tooltip>
  );
}
