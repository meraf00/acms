'use client';

import AuthGuard from '@/lib/features/auth/components/auth-guard';

function IndexPage() {
  return (
    <div className="container relative flex flex-col-reverse md:flex-row justify-center h-screen gap-y-16">
      Hi there
    </div>
  );
}

export default AuthGuard({ Component: IndexPage });
