import { User } from '../../auth/types/user';

export interface Student {
  _id: string;

  group: string;

  codeforcesHandle: string;

  profile: User;
}
