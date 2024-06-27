'use client';

import { useAppSelector } from '@/lib/core/hooks';
import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { Sidebar } from '@/lib/features/dashboard/components/side-bar';
import { UserNav } from '@/lib/features/dashboard/components/user-nav';
import { ScrollArea } from '@radix-ui/react-scroll-area';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div
        className="sticky h-screen top-0 w-fit lg:w-1/5 
      dark:border-r dark:border-gray-600/25 border-r 
      border-gray-600/25 border-dashed 
      bg-opacity-5 dark:bg-opacity-5"
      >
        <Sidebar className="mr-15" />
      </div>

      <div className="flex absolute right-7 top-7 z-50">
        {user && (
          <UserNav
            email={user!.email}
            name={user!.name}
            avatarImage={user!.picture}
          />
        )}
      </div>

      <ScrollArea className="relative w-full lg:w-4/5 h-screen overflow-auto">
        <main className="px-16 py-6 mt-14">{children}</main>
      </ScrollArea>
    </div>
  );
}

export default AuthGuard({ Component: DashboardLayout });
