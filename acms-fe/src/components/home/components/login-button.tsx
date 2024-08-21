'use client';

import { buttonVariants } from '@/components/ui/button';
import { useAppSelector } from '@/lib/core/hooks';
import { cn } from '@/lib/core/utils';
import { Activity, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function LoginButton() {
  const user = useAppSelector((state) => state.auth.user);
  const show = !user;

  return show ? (
    <Link
      href={'/contests/ongoing'}
      className={cn(
        'w-full',
        'gap-2',
        buttonVariants({
          variant: 'link',
        })
      )}
    >
      <Activity className="w-4 h-4" /> Ongoing Contests
    </Link>
  ) : (
    <Link
      href="/auth/login"
      className={cn(
        'w-full',
        'gap-2',
        buttonVariants({
          variant: 'ghost',
        })
      )}
    >
      <LogInIcon className="w-4 h-4" /> Login
    </Link>
  );
}
