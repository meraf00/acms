import { AxiosInstance } from 'axios';
import { Contest } from './types/contest';

export const getContests = async (
  client: AxiosInstance
): Promise<Contest[]> => {
  const { data } = await client.get('/contests');
  return data;
};
