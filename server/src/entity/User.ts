import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Role } from './Role';
import { Todo } from './Todo';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @Column({
    length: 64,
    unique: true,
  })
  email: string;

  @IsNotEmpty()
  @Column()
  password: string;

  @IsNotEmpty()
  @Column()
  name: string;

  @ManyToOne((type) => Role, (role) => role.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  role: Role;

  @OneToMany((type) => Todo, (todo) => todo.user)
  @JoinColumn()
  todos: Todo[];
}
