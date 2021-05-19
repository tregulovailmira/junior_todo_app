import {
  IsEmail,
  IsOptional,
  IsNotEmpty,
  Length,
  IsString,
} from 'class-validator';

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
  roleId: number;

  test: string;
}
