'use client';

import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { Sidebar } from '@/lib/features/dashboard/components/side-bar';
import { UserNav } from '@/lib/features/dashboard/components/user-nav';
import { useAppSelector } from '@/lib/hooks';

function IndexPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <main className="relative">
      <div className="fixed top-0 w-1/5">
        <Sidebar />
      </div>
      <div className="flex justify-end p-6">
        <UserNav
          email={user!.email}
          name={user!.name}
          avatarImage={user!.picture}
        />
      </div>
    </main>
  );
}

export default AuthGuard({ Component: IndexPage });
