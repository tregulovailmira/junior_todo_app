import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  public async create(
    createTodoDto: CreateTodoDto,
    userId: number,
  ): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create();
    newTodo.header = createTodoDto.header;
    if (createTodoDto.body) {
      newTodo.body = createTodoDto.body;
    }
    if (createTodoDto.status) {
      newTodo.status = createTodoDto.status;
    }
    newTodo.userId = userId;
    newTodo.deadline = createTodoDto.deadline;

    try {
      return this.todoRepository.save(newTodo);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findAll(userId: string): Promise<TodoEntity[]> {
    try {
      return await this.todoRepository.find({ where: { userId } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findOne(id: number): Promise<TodoEntity> {
    const foundTodo = await this.todoRepository.findOne(id);
    if (foundTodo) {
      return foundTodo;
    }
    throw new NotFoundException('Todo with this id not found');
  }

  public async findOneForUser(id: number, userId: number): Promise<TodoEntity> {
    const foundTodo = await this.todoRepository.findOne({ id, userId });
    if (foundTodo) {
      return foundTodo;
    }
    throw new NotFoundException('Todo with this id not found');
  }

  public async update(id, data): Promise<TodoEntity> {
    const { affected } = await this.todoRepository.update(id, data);
    if (affected === 0) {
      throw new BadRequestException("Can't update todo with this id!");
    }
    return await this.todoRepository.findOne(id);
  }

  public async remove(id: number): Promise<void> {
    const { affected } = await this.todoRepository.delete(id);
    if (affected === 0) {
      throw new BadRequestException("Can't delete todo with this id");
    }
  }

  public async removeForUser(id: number, userId: number): Promise<void> {
    const { affected } = await this.todoRepository.delete({
      id,
      userId,
    });
    if (affected === 0) {
      throw new BadRequestException("Can't delete todo with this id");
    }
  }
}
