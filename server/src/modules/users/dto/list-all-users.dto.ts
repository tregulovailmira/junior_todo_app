import { IsOptional, IsNumberString } from 'class-validator';

export class ListAllUsersDto {
  @IsOptional()
  @IsNumberString()
  limit: string | undefined;

  @IsOptional()
  @IsNumberString()
  offset: string | undefined;
}
