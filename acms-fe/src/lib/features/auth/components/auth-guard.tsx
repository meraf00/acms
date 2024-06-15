'use client';

import { useAppSelector } from '@/lib/core/hooks';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
}

export default function AuthGuard({ Component, allowedRoles }: AuthGuardProps) {
  return function IsAuth(props: any) {
    const user = useUser();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
      if (user && allowedRoles && !allowedRoles.includes(user.role)) {
        // return redirect('/404');
      }

      setIsMounted(true);
    }, [user]);

    if (!isMounted || !user) {
      return null;
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
