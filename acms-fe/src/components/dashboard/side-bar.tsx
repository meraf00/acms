'use client';

import { cn } from '@/lib/utils';

import { useAppSelector } from '@/store/store';
import { buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Database, Plus, Bug, Activity, ClockIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Roles } from '@/store/auth/types';

export function Sidebar({ className }: any) {
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const activateOn = (path: string) => {
    if (pathname === path) {
      return cn(
        buttonVariants({ variant: 'secondary', size: 'sm' }),
        'lg:w-full justify-start'
      );
    } else {
      return cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'lg:w-full justify-start'
      );
    }
  };

  return (
    <div className={cn('pb-12', className)}>
      <ScrollArea className="h-screen">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="hidden lg:block mb-2 lg:px-2 text-lg font-semibold tracking-tight">
              Contests
            </h2>
            <div className="space-y-1 flex flex-col">
              {user?.role !== Roles.student ? (
                <Link href="/contests" className={activateOn('/contests')}>
                  <Database className="lg:mr-2 h-4 w-4" />
                  <span className="hidden lg:block">Contests</span>
                </Link>
              ) : null}

              <Link
                href="/contests/ongoing"
                className={activateOn('/contests/ongoing')}
              >
                <Activity className="lg:mr-2 h-4 w-4" />
                <span className="hidden lg:block">Ongoing</span>
              </Link>

              {user?.role !== Roles.student ? (
                <Link
                  href="/contests/upcoming"
                  className={activateOn('/contests/upcoming')}
                >
                  <ClockIcon className="lg:mr-2 h-4 w-4" />
                  <span className="hidden lg:block">Upcoming</span>
                </Link>
              ) : null}

              {user?.role !== Roles.student ? (
                <Link
                  href="/contests/add"
                  className={activateOn('/contests/add')}
                >
                  <Plus className="lg:mr-2 h-4 w-4" />
                  <span className="hidden lg:block">Add contest</span>
                </Link>
              ) : null}
            </div>
          </div>

          <div className="px-4 py-2">
            <h2 className="hidden lg:block mb-2 px-2 text-lg font-semibold tracking-tight">
              Issue
            </h2>
            <div className="space-y-1">
              <Link href="/issues" className={activateOn('/issues')}>
                <Bug className="lg:mr-2 h-4 w-4" />
                <span className="hidden lg:block">Report issue</span>
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
