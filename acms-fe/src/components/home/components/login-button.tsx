'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/core/utils';
import { useUser } from '@/lib/features/auth/hooks/useUser';
import { Activity, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';

export default function LoginButton() {
  const { currentUser, userLoaded } = useUser();
  const [show, setShow] = React.useState(false);

  useEffect(() => {
    if (currentUser && userLoaded) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [currentUser, userLoaded]);

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
