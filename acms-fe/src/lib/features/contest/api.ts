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
  const result = await client.get('/contests');
  if (result?.data) return result.data.data;
  return [];
};

export const getContest = async (
  client: AxiosInstance,
  params: GetContestParams
): Promise<Contest | null> => {
  const { id } = params;
  const result = await client.get(`/contests/${id}`);
  if (result?.data) return result.data.data;
  return null;
};

export const getContestWithRecord = async (
  client: AxiosInstance,
  params: GetContestParams
): Promise<{ contest: Contest; record: any } | null> => {
  const { id } = params;
  const result = await client.get(`/contests/${id}/records`);
  if (result?.data) return result.data.data;
  return null;
};

export const getActiveContests = async (
  client: AxiosInstance
): Promise<Contest[]> => {
  const result = await client.get('/active-contests');
  if (result?.data) return result.data.data;
  return [];
};

export const createContest = async (
  client: AxiosInstance,
  params: CreateContestParams
): Promise<Contest | null> => {
  const result = await client.post('/contests', params);
  if (result?.data) return result.data.data;
  return null;
};
