import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoEntity } from '../todo/todo.entity';

@Entity('attachment')
export class AttachmentEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public link: string;

  @Column()
  public todoId: number;

  @Column()
  public filePath: string;

  @ManyToOne(() => TodoEntity, (object) => object.attachments)
  public todo: TodoEntity;
}
