'use client';

import { useQuery } from '@tanstack/react-query';
import { useApi } from '@lib/core/hooks';
import { getContestImages } from '../api';
import { siteConfig } from '@/lib/core/config';

const QUERY_KEY = ['contests'];
const staleTime = siteConfig.api.staleTime;

export const useGetContestImages = (
  contestId: string,
  contestantId: string
) => {
  const client = useApi();

  return useQuery({
    queryKey: [...QUERY_KEY, contestId, 'students', contestantId],
    queryFn: () => getContestImages(client, { contestId, contestantId }),
    staleTime,
  });
};
