import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('todo')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public header: string;

  @Column('text')
  public body: string;

  @Column()
  public userId: number;

  @ManyToOne(() => UserEntity, (object) => object.todos)
  public user: UserEntity;
}
