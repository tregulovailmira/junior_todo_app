import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './todo.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users/:userId/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: string,
  ): Promise<TodoEntity> {
    try {
      return await this.todoService.create(createTodoDto, +userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Param('userId') userId: string): Promise<TodoEntity[]> {
    return await this.todoService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoEntity> {
    return await this.todoService.findOne(+id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(+id);
  }
}
