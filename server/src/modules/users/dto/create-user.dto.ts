import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  IsString,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @Length(2, 128)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(6, 128)
  @IsString()
  password: string;

  @IsOptional()
  role: UserRole;

  test: string;
}
