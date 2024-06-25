import { useApi } from '@/lib/core/hooks';
import { useMutation } from '@tanstack/react-query';
import { SendLoginEmailParams, sendLoginLink } from '../api';
import { redirect } from 'next/navigation';

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const client = useApi();

  const mutation = useMutation({
    mutationFn: (params: SendLoginEmailParams) => {
      return sendLoginLink(client, params);
    },

    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
    },

    onError: onError,
  });

  return mutation;
};

export const useLogout = () => {
  const client = useApi();

  return useMutation({
    mutationFn: () => {
      return client.post('/auth/logout');
    },
    onSuccess: () => {
      redirect('/auth/login');
    },
  });
};
