import { useApi } from '@/lib/core/hooks';
import { useMutation } from '@tanstack/react-query';
import { ReportIssueParams, reportIssue } from './api';

export const useReportIssue = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const client = useApi();

  const mutation = useMutation({
    mutationFn: (newIssue: ReportIssueParams) => {
      return reportIssue(client, newIssue);
    },

    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
    },

    onError: onError,
  });

  return mutation;
};
