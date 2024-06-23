import { AxiosInstance } from 'axios';
import { CapturedImage } from './types/record';

export interface GetContestImages {
  contestId: string;
  contestantId: string;
}

export const getContestImages = async (
  client: AxiosInstance,
  params: GetContestImages
): Promise<CapturedImage[]> => {
  const { data } = await client.get(
    `/records/${params.contestId}/students/${params.contestantId}`
  );
  return data.data;
};
