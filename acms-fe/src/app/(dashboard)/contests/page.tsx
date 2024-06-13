'use client';

import AuthGuard from '@/lib/features/auth/components/auth-guard';
import { useGetContests } from '@/lib/features/hooks';
import React from 'react';

export function Contest() {
  const { data, isLoading, error } = useGetContests();

  return <>Contests</>;
}

export default AuthGuard({ Component: Contest, allowedRoles: ['hoe'] });
