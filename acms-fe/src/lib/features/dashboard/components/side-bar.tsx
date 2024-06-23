'use client';

import { cn } from '@/lib/core/utils';
import { buttonVariants } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Database,
  Plus,
  GraduationCap,
  Bug,
  Activity,
  Timer,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar({ className }: any) {
  const pathname = usePathname();

  const activateOn = (path: string) => {
    if (pathname === path) {
      return cn(
        buttonVariants({ variant: 'secondary', size: 'sm' }),
        'w-full justify-start'
      );
    } else {
      return cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'w-full justify-start'
      );
    }
  };

  return (
    <div className={cn('pb-12', className)}>
      <ScrollArea className="h-screen">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Contests
            </h2>
            <div className="space-y-1">
              <Link href="/contests" className={activateOn('/contests')}>
                <Database className="mr-2 h-4 w-4" />
                Contests
              </Link>

              <Link
                href="/contests/ongoing"
                className={activateOn('/contests/ongoing')}
              >
                <Activity className="mr-2 h-4 w-4" />
                Ongoing
              </Link>

              <Link
                href="/contests/add"
                className={activateOn('/contests/add')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add contest
              </Link>
            </div>
          </div>

          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Students
            </h2>
            <div className="space-y-1">
              <Link href="/students" className={activateOn('/students')}>
                <GraduationCap className="mr-2 h-4 w-4" />
                Students
              </Link>
              <Link
                href="/students/add"
                className={activateOn('/students/add')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add student
              </Link>
            </div>
          </div>

          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Issue
            </h2>
            <div className="space-y-1">
              <Link href="/issues" className={activateOn('/issues')}>
                <Bug className="mr-2 h-4 w-4" />
                Report issue
              </Link>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
