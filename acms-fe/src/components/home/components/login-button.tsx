'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/core/utils';
import { useUser } from '@/lib/features/auth/hooks/useUser';
import { Activity, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function LoginButton() {
  const { currentUser, userLoaded } = useUser();

  console.log(currentUser, userLoaded);

  if (!userLoaded) {
    return null;
  } else if (currentUser) {
    return (
      <Link
        href="/contests/ongoing"
        className={cn('w-full', 'gap-2', buttonVariants({ variant: 'link' }))}
      >
        <Activity className="w-4 h-4" />
        Ongoing Contests
      </Link>
    );
  } else {
    return (
      <Link
        href="/auth/login"
        className={cn('w-full', 'gap-2', buttonVariants({ variant: 'ghost' }))}
      >
        <LogInIcon className="w-4 h-4" />
        Login
      </Link>
    );
  }
}
