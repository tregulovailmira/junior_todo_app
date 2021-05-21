import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => TodoEntity, (object) => object.user)
  todos: TodoEntity[];
}
