import { Profile } from '../../user/types/profile';
import { Role } from './role';

export interface User {
  _id: string;

  name: string;

  email: string;

  role: Role;

  profile: Profile;

  picture: string;
}
