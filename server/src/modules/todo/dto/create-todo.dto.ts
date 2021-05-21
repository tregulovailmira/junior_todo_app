import { Length } from 'class-validator';

export class CreateTodoDto {
  @Length(2, 128)
  header: string;

  body: string;
}
