import { AxiosInstance } from 'axios';

export interface SendLoginEmailParams {
  email: string;
}

export const sendLoginLink = async (
  client: AxiosInstance,
  params: SendLoginEmailParams
) => {
  const result = await client.post('/auth/email', params);
  return result.data.data;
};
