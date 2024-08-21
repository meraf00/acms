import { User } from '../types/user';

export const Auth = 'auth';
export const LoadAuthState = `${Auth}/load`;
export const SaveAuthState = `${Auth}/save`;

export interface AuthState {
  user: User | null;
  token: string | null;
}
