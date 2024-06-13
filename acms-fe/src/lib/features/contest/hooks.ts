'use client';

import { useQuery } from '@tanstack/react-query';
import { useApi } from '@lib/core/hooks';
import { getContests } from './api';

const QUERY_KEY = ['contests'];

export const useGetContests = () => {
  const client = useApi();

  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getContests(client),
  });
};
