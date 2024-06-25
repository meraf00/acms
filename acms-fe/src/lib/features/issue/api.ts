import { AxiosInstance } from 'axios';

export interface ReportIssueParams {
  type: string;
  message: string;
}

export const reportIssue = async (
  client: AxiosInstance,
  params: ReportIssueParams
) => {
  const result = await client.post('/issues', params);
  if (result?.data) return result.data.data;
  return null;
};
