import { AxiosInstance } from 'axios';
import { Contest } from './types/contest';

export interface GetContestParams {
  id?: string;
}

export const getContests = async (
  client: AxiosInstance
): Promise<Contest[]> => {
  const { data } = await client.get('/contests');
  return data.data;
};

export const getContest = async (
  client: AxiosInstance,
  params: GetContestParams
): Promise<Contest[]> => {
  const { id } = params;
  const { data } = await client.get(`/contests/${id}`);
  return data.data;
};
