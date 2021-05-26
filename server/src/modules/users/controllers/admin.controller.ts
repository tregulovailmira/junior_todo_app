import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashPassword } from '../users.decorator';
import { UserResponse } from '../user.response';
import { RoleEnum } from '../../role/role.enum';
import { Roles } from '../../role/role.decorator';

@Roles(RoleEnum.Admin)
@Controller('admin/users')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(
    @Req() req,
    @Body() newUser: CreateUserDto,
    @HashPassword() hashPassword: string,
  ): Promise<UserResponse> {
    const preparedUser = {
      ...newUser,
      password: hashPassword,
    };
    const user = await this.usersService.createAndSave(preparedUser);
    return new UserResponse(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Query('filters') options: string): Promise<UserResponse[]> {
    const parsedOptions = options ? JSON.parse(options) : {};
    const allUsers = await this.usersService.findMany(parsedOptions);
    return allUsers.map((user) => new UserResponse(user));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param() params): Promise<UserResponse> {
    const { id } = params;
    const foundUser = await this.usersService.findById(id);
    return new UserResponse(foundUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  async updateUser(@Param() params, @Body() data): Promise<UserResponse> {
    const { id } = params;
    const updatedUser = await this.usersService.updateUser(id, data);
    return new UserResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.usersService.deleteUser(id);
  }

  @Delete()
  @HttpCode(204)
  async deleteMany(@Body() body): Promise<void> {
    const { usersIds } = body;
    await this.usersService.deleteMany(usersIds);
  }
}
