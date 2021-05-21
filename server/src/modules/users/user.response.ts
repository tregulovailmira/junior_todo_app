import { Exclude } from 'class-transformer';
import { UserRole } from './user.entity';

export class UserResponse {
  id: number;

  email: string;

  @Exclude()
  password: string;

  name: string;

  role: UserRole;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
