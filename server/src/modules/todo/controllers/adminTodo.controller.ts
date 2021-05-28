import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from '../todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { TodoEntity } from '../todo.entity';
import { Roles } from '../../role/role.decorator';
import { RoleEnum } from '../../role/role.enum';

@Roles(RoleEnum.Admin)
@Controller('admin/users/:userId/todos')
export class AdminTodoController {
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

  @Patch(':id')
  async update(
    @Body() updateTodoDto: UpdateTodoDto,
    @Param('id') id: string,
  ): Promise<TodoEntity> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(+id);
  }
}
