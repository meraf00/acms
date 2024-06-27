'use client';

import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import { useUser } from '../hooks/useUser';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
}

export default function AuthGuard({ Component, allowedRoles }: AuthGuardProps) {
  return function IsAuth(props: any) {
    const { currentUser: user, userLoaded: loaded } = useUser();
    const [isMounted, setIsMounted] = React.useState(false);

    useEffect(() => {
      if (user && allowedRoles && !allowedRoles.includes(user.role)) {
        return redirect('/404');
      }

      if (loaded && user === null) {
        return redirect('/auth/login');
      }

      setIsMounted(true);
    }, [user, loaded]);

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
