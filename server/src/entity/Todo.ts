import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Min, Max, IsNotEmpty } from 'class-validator';
import { User } from './User';
import { Attachment } from './Attachment';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Min(2, {
    message: 'Header must be longer than 2 symbols',
  })
  @Max(128, {
    message: 'Header must be less than 128 symbols',
  })
  @IsNotEmpty()
  @Column({ length: 128 })
  header: string;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne((type) => User, (user) => user.todos, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @OneToMany((type) => Attachment, (attachment) => attachment.todo)
  @JoinColumn()
  attachments: Attachment[];
}
