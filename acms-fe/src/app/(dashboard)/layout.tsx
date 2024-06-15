'use client';

import { useAppSelector } from '@/lib/core/hooks';
import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { Sidebar } from '@/lib/features/dashboard/components/side-bar';
import { UserNav } from '@/lib/features/dashboard/components/user-nav';

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="sticky h-screen top-0 w-1/5 dark:bg-stone-800 bg-stone-400 bg-opacity-5 dark:bg-opacity-5">
        <Sidebar className="mr-15" />
      </div>

      <div className="relative w-4/5">
        <div className="flex absolute right-7 top-7">
          {user && (
            <UserNav
              email={user!.email}
              name={user!.name}
              avatarImage={user!.picture}
            />
          )}
        </div>

        <main className="px-16 py-6 mt-14">{children}</main>
      </div>
    </div>
  );
}

export default AuthGuard({ Component: DashboardLayout });
