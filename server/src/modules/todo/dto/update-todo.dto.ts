import { Length, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @Length(2, 128)
  @IsOptional()
  header: string;

  @IsOptional()
  body: string;

  @IsOptional()
  status: string;

  @IsOptional()
  deadline: Date;
}
