import { Role } from './role';

export interface User {
  _id: string;

  name: string;

  email: string;

  role: Role;
}
