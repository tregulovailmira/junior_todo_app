import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Min, Max, IsNotEmpty } from 'class-validator';
import { User } from './User';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Min(2, {
    message: 'Role must be longer than 2 symbols',
  })
  @Max(32, {
    message: 'Role must be longer than 2 symbols',
  })
  @IsNotEmpty()
  @Column({ length: 32, unique: true })
  name: string;

  @OneToMany((type) => User, (user) => user.role)
  @JoinColumn()
  users: User[];
}
