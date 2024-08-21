'use client';

import React from 'react';
import { useParams } from 'next/navigation';

import Loading from '@/components/ui/loading';
import { CalendarSearch, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ContestantsTable } from '@/lib/features/contest/components/contestants-table';
import { useGetContestWithRecordQuery } from '@/lib/features/contest/store/api';
import { useAppSelector } from '@/lib/core/hooks';

export default function Contest() {
  const { id } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetContestWithRecordQuery(
    id as string,
    {
      skip: !user,
    }
  );

  if (isLoading)
    return (
      <div className="w-full h-[80vh] flex items-center justify-center">
        <Loading />
      </div>
    );

  if (data && data.contest) {
    const startTime = new Date(data.contest.startingTime).toLocaleTimeString(
      'en-US',
      {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
      }
    );
    const endTime = new Date(data.contest.endingTime).toLocaleTimeString(
      'en-US',
      {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour12: true,
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
      }
    );

    const participated = data.record.map((r: any) => r.user);
    const students = data.contest.students;
    students.map((user) => {
      return {
        ...user,
        participated: participated.includes(user._id),
      };
    });

    return (
      <div className="pr-24">
        <div className="flex justify-between w-full ">
          <h1 className="font-bold text-2xl mb-10 flex gap-2 items-start">
            {data.contest.name}
            <Link
              href={`http://codeforces.com/gym/${data.contest.id}`}
              target="_blank"
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
          </h1>

          <div className="flex flex-col gap-2 items-end">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <CalendarSearch className="h-4 w-4" />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2">
                    <div>
                      <div>From</div>
                      <div>To</div>
                    </div>
                    <div>
                      <div>{startTime}</div>
                      <div>{endTime}</div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div>
          {data && (
            <ContestantsTable
              contestId={data.contest._id}
              contestants={students}
            />
          )}
        </div>
      </div>
    );
  }
}
