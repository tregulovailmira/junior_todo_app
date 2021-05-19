import { Exclude } from 'class-transformer';
import { Role } from '../../entity/Role';

export class UserResponse {
  id: number;

  email: string;

  @Exclude()
  password: string;

  name: string;

  role: Role;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
