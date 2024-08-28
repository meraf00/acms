'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { ExternalLinkIcon, Monitor } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import Image from 'next/image';
import contestImage from '@public/images/Vector_2648.jpg';
import { useAppSelector } from '@/store/store';
import { Roles } from '@/store/auth/types';
import { Contest } from '@/store/contests/types';

export interface LiveContestCardProps {
  contest: Contest;
  isLive?: boolean;
}

export default function LiveContestCard({
  contest,
  isLive = true,
}: LiveContestCardProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [timeRef, setTimeRef] = React.useState<string>('');

  const [days, setDays] = React.useState<number>(0);
  const [hours, setHours] = React.useState<number>(0);
  const [minutes, setMinutes] = React.useState<number>(0);
  const [secs, setSecs] = React.useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff =
        new Date(isLive ? contest.endingTime : contest.startingTime).getTime() -
        Date.now();
      setDays(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSecs(Math.floor(((diff % (1000 * 60 * 60)) % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [contest, contest.endingTime, contest.startingTime, isLive]);

  useEffect(() => {
    if (isLive) {
      if (days > 0) {
        setTimeRef(
          `Monitoring ends in ${days}d ${hours}h ${minutes}m ${secs}s`
        );
      } else if (hours > 0) {
        setTimeRef(`Monitoring ends in ${hours}h ${minutes}m ${secs}s`);
      } else if (minutes > 0) {
        setTimeRef(`Monitoring ends in ${minutes}m ${secs}s`);
      } else {
        setTimeRef(`Monitoring ends in ${secs}s`);
      }
    } else {
      if (days > 0) {
        setTimeRef(
          `Monitoring starts in ${days}d ${hours}h ${minutes}m ${secs}s`
        );
      } else if (hours > 0) {
        setTimeRef(`Monitoring starts in ${hours}h ${minutes}m ${secs}s`);
      } else if (minutes > 0) {
        setTimeRef(`Monitoring starts in ${minutes}m ${secs}s`);
      } else {
        setTimeRef(`Monitoring starts in ${secs}s`);
      }
    }
  }, [days, hours, minutes, secs, isLive]);

  return (
    <Tooltip>
      <TooltipTrigger className="">
        <Card
          className={` ${cn(
            'w-[420px]',
            'bg-background overflow-hidden rounded-3xl shadow-[0_10px_20px_rgba(0,0,0,_0.08)] dark:shadow-[0_10px_20px_rgba(0,0,0,_0.3)] border-0 h-full flex flex-col justify-between'
          )}`}
        >
          <CardContent className="max-h-44 overflow-hidden">
            <Image
              priority={false}
              src={contestImage}
              alt={'contest photo '}
            ></Image>
          </CardContent>
          <div className="flex justify-between ">
            <CardHeader className="py-4 pl-5 flex flex-col items-start justify-center">
              <CardTitle className="text-ellipsis text-md font-bold overflow-hidden text-left line-clamp-1">
                {contest.name}
              </CardTitle>
              <CardDescription className="text-xs font-sm text-left truncate">
                {timeRef}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex flex-col px-0 py-4 mr-3 gap-2 max-w-44 items-start justify-end">
              <Link
                href={contest.invitationLink ?? ''}
                target="_blank"
                className={` ${cn('', buttonVariants({ variant: 'link' }))}`}
              >
                <ExternalLinkIcon className="mr-2 h-4 w-4" /> Open Contest
              </Link>
              {user?.role === Roles.student && isLive ? (
                <Link
                  href={`/monitoring/${contest._id}`}
                  className={`  ${cn(
                    buttonVariants({ variant: 'default' }),
                    'rounded-xl'
                  )}`}
                >
                  <Monitor className="mr-2 h-4 w-4" /> Start Monitoring
                </Link>
              ) : null}
            </CardFooter>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent className="text-sm bg-opacity-0 text-muted-foreground ">
        {contest.name}
      </TooltipContent>
    </Tooltip>
  );
}
