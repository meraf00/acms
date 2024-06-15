export const Auth = 'auth';
export const LoadAuthState = `${Auth}/load`;
export const SaveAuthState = `${Auth}/save`;

export interface AuthState {
  user: {
    email: string;
    name: string;
    picture: string;
    role: string;
  } | null;
}
