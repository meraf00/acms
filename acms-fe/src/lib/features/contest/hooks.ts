'use client';

import { useQuery } from '@tanstack/react-query';
import { useApi } from '@lib/core/hooks';
import { getContests } from './api';
import { siteConfig } from '@/lib/core/config';

const QUERY_KEY = ['contests'];
const staleTime = siteConfig.api.staleTime;

export const useGetContests = () => {
  const client = useApi();

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getContests(client),
    staleTime,
  });
};

export const useGetContest = (id: string) => {
  const client = useApi();

  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => getContests(client),
    staleTime,
  });
};
