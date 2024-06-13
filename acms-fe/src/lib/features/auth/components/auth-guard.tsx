'use client';

import { useAppSelector } from '@/lib/hooks';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
}

export default function AuthGuard({ Component, allowedRoles }: AuthGuardProps) {
  return function IsAuth(props: any) {
    const user = useAppSelector((state) => state.auth.user);
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
      if (!user) {
        return redirect('auth/login');
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        return redirect('/404');
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
