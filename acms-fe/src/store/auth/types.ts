export type Role = 'acms' | 'hoe' | 'hoa' | 'student';

export const Roles = {
  acms: 'acms',
  hoe: 'hoe',
  hoa: 'hoa',
  student: 'student',
};

export interface Session {
  user?: User;
  token?: string;
}

export interface Profile {
  _id: string;
  group: string;
  codeforcesHandle: string;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: Role;
  profile: Profile;
  picture: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface LoginViaEmail {
  email: string;
}
