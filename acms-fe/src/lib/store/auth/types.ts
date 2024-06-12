export const Auth = 'auth';
export const LoadAuthState = `${Auth}/load`;
export const SaveAuthState = `${Auth}/save`;

export interface AuthState {
  token: string | null;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
}
