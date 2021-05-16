import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { IsEmail, Min, Max, IsNotEmpty } from 'class-validator';
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

    @Min(2, {
        message: 'Name must be longer than 2 symbols',
    })
    @Max(128, {
        message: 'Name must be less than 128 symbols'
    })
    @IsNotEmpty()
    @Column()
    name: string;

    @ManyToOne(type => Role, role => role.users, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    role: Role;

    @OneToMany(type => Todo, todo => todo.user)
    @JoinColumn()
    todos: Todo[];

}