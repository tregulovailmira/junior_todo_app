import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from '../todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { TodoEntity } from '../todo.entity';
import { Roles } from '../../role/role.decorator';
import { RoleEnum } from '../../role/role.enum';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.User)
@Controller('user/todos')
export class UsersTodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: any,
  ): Promise<TodoEntity> {
    const {
      user: { userId },
    } = req;
    try {
      return await this.todoService.create(createTodoDto, userId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Req() req: any): Promise<TodoEntity[]> {
    const {
      user: { userId },
    } = req;
    return await this.todoService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param('id') id: string): Promise<TodoEntity> {
    const {
      user: { userId },
    } = req;
    return await this.todoService.findOneForUser(+id, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Req() req: any, @Param('id') id: string): Promise<void> {
    const {
      user: { userId },
    } = req;
    await this.todoService.removeForUser(+id, userId);
  }
}
