'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApi } from '@lib/core/hooks';
import {
  CreateContestParams,
  createContest,
  getActiveContests,
  getContest,
  getContestWithRecord,
  getContests,
  updateContest,
} from './api';
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
    queryFn: () => getContest(client, { id }),
    staleTime,
  });
};
export const useGetContestWithRecord = (id: string) => {
  const client = useApi();

  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => getContestWithRecord(client, { id }),
    staleTime,
  });
};

export const useGetActiveContests = () => {
  const client = useApi();

  return useQuery({
    queryKey: ['active-contests'],
    queryFn: () => getActiveContests(client),
    staleTime,
  });
};

export const useCreateContest = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const client = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newContest: CreateContestParams) => {
      console.log(newContest);
      return await createContest(client, newContest);
    },

    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },

    onError: onError,
  });

  return mutation;
};

export const useUpdateContest = ({
  id,
  onSuccess,
  onError,
}: {
  id: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const client = useApi();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newContest: CreateContestParams) => {
      return await updateContest(client, {
        data: newContest,
        id: id,
      });
    },

    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
      await queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },

    onError: onError,
  });

  return mutation;
};
