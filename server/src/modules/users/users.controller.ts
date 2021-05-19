import {
  Req,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  Query,
  HttpException,
} from '@nestjs/common';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { Role } from '../../entity/Role';
import { UsersService } from './users.service';
import { CreateUserDto, ListAllUsersDto } from './dto';
import { HashPassword } from './users.decorator';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserResponse } from './user.response';

@Controller('users')
export class UsersController {
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Req() req,
    @Body() data: CreateUserDto,
    @HashPassword() hashPassword: string,
  ): Promise<UserResponse> {
    const { name, email, roleId } = data;

    const userRepository = getCustomRepository(UsersService);
    const user = await userRepository.createAndSave(
      name,
      email,
      hashPassword,
      roleId,
    );
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query() query: ListAllUsersDto): Promise<UserResponse[]> {
    const { limit, offset } = query;
    const userRepository = getCustomRepository(UsersService);
    const allUsers = await userRepository.findMany(limit, offset);
    return allUsers.map((user) => new UserResponse(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param() params): Promise<UserResponse> {
    const { id } = params;

    const userRepository = getCustomRepository(UsersService);
    const foundUser = await userRepository.findById(id);
    return new UserResponse(foundUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateUser(@Param() params, @Body() data): Promise<UserResponse> {
    const { id } = params;
    const userRepository = getCustomRepository(UsersService);
    const updatedUser = await userRepository.updateUser(id, data);
    return new UserResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param() params): Promise<void> {
    const { id } = params;

    const userRepository = getCustomRepository(UsersService);
    await userRepository.deleteUser(id);
  }

  @Delete()
  @HttpCode(204)
  async deleteMany(@Body() data): Promise<void> {
    const { usersIds } = data;
    const userRepository = getCustomRepository(UsersService);
    await userRepository.deleteMany(usersIds);
  }
}
