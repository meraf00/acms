import { AxiosInstance } from 'axios';
import { Contest } from './types/contest';

export interface GetContestParams {
  id?: string;
}

export interface CreateContestParams {
  id: string;
  name: string;
  students: string[];
  startingTime: string;
  endingTime: string;
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
): Promise<Contest> => {
  const { id } = params;
  const { data } = await client.get(`/contests/${id}`);
  return data.data;
};

export const getActiveContests = async (
  client: AxiosInstance
): Promise<Contest[]> => {
  const { data } = await client.get('/active-contests');
  return data.data;
};

export const createContest = async (
  client: AxiosInstance,
  params: CreateContestParams
) => {
  const result = await client.post('/contests', params);
  console.log(result);
  return result.data.data;
};
