import { Length, IsOptional } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
  @Length(2, 128)
  header: string;

  body: string;

  @IsOptional()
  status: TodoStatus;

  deadline: Date;
}
