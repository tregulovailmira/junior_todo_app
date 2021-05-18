import { Controller, Post, Get, Patch, Delete, Body, Param, HttpCode, Query, HttpException } from '@nestjs/common';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../../entity/User';
import { Role } from '../../entity/Role';
import { UsersService } from './users.service';
import { CreateUserDto, ListAllUsersDto } from './dto';

@Controller('users')
export class UsersController {

    @Post()
    async create(@Body() data: CreateUserDto): Promise<object> {
        const { name, email, password, roleId } = data;
            const userRepository = getCustomRepository(UsersService);
            const user = await userRepository.createAndSave(name, email, password, roleId);
            return user;
    }

    @Get()
    async findAll(@Query() query: ListAllUsersDto): Promise<object[]> {
        const { limit, offset } = query;
        const userRepository = getCustomRepository(UsersService);
        const allUsers = await userRepository.findMany(limit, offset);
        return allUsers;
    }

    @Get(':id')
    async findOne(@Param() params): Promise<object> {
        const { id } = params;

        const userRepository = getCustomRepository(UsersService);
        const foundUser = await userRepository.findById(id);
        return foundUser;
    }

    @Patch(':id')
    async updateUser(@Param() params, @Body() data): Promise<object> {
        const { id } = params;
        const userRepository = getCustomRepository(UsersService);
        const updatedUser = userRepository.updateUser(id, data);
        return updatedUser;
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