import { cn } from '@/lib/core/utils';
import { Button } from '@components/ui/button';
import { ScrollArea } from '@components/ui/scroll-area';
import {
  Database,
  Plus,
  GraduationCap,
  Bug,
  Activity,
  Timer,
} from 'lucide-react';

export function Sidebar({ className, playlists }: any) {
  return (
    <div className={cn('pb-12', className)}>
      <ScrollArea className="h-screen">
        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Contests
            </h2>
            <div className="space-y-1">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-start"
              >
                <Database className="mr-2 h-4 w-4" />
                Contests
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Activity className="mr-2 h-4 w-4" />
                Ongoing
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Timer className="mr-2 h-4 w-4" />
                Upcoming
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add contest
              </Button>
            </div>
          </div>

          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Students
            </h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Students
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add student
              </Button>
            </div>
          </div>

          <div className="px-4 py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Issue
            </h2>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                <Bug className="mr-2 h-4 w-4" />
                Report issue
              </Button>
            </div>
          </div>

          {/* 
        <div className="py-2">
          <h2 className="relative px-6 text-lg font-semibold tracking-tight">
            Playlists
          </h2>
          <ScrollArea className="h-[300px] px-2">
            <div className="space-y-1 p-2">
              {playlists?.map((playlist: any, i: number) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start font-normal"
                >
                  <Database className="mr-2 h-4 w-4" />
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        */}
        </div>
      </ScrollArea>
    </div>
  );
}

<Sidebar />;
