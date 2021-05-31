import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { AttachmentEntity } from '../attachments/attachment.entity';

export enum TodoStatus {
  DONE = 'done',
  IN_PROGRESS = 'in progress',
}

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

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.IN_PROGRESS,
  })
  public status: TodoStatus;

  @Column({ type: 'date' })
  public deadline: Date;

  @ManyToOne(() => UserEntity, (object) => object.todos)
  public user: UserEntity;

  @OneToMany(() => AttachmentEntity, (object) => object.todo)
  attachments: AttachmentEntity[];
}
