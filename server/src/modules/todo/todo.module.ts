import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { UsersTodoController } from './controllers/usersTodo.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { AdminTodoController } from './controllers/adminTodo.controller';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([TodoEntity])],
  controllers: [UsersTodoController, AdminTodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
