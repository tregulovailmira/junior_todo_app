import { Length, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @Length(2, 128)
  header: string;

  @IsOptional()
  body: string;

  @IsOptional()
  status: string;
}
