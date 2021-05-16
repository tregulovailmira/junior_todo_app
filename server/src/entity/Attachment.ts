import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { IsNotEmpty } from 'class-validator';
import { Todo } from './Todo';

@Entity('attachment')
export class Attachment {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column()
    link: string

    @ManyToOne(type => Todo, todo => todo.attachments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    todo: Todo;
}