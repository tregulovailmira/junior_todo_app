import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserResponse } from '../user.response';
import { RoleEnum } from '../../role/role.enum';
import { Roles } from '../../role/role.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.User)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findOne(@Req() req: any): Promise<UserResponse> {
    const {
      user: { userId: id },
    } = req;
    const foundUser = await this.usersService.findById(id);
    return new UserResponse(foundUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  async updateUser(@Req() req: any, @Body() data: any): Promise<UserResponse> {
    const {
      user: { userId: id },
    } = req;
    const updatedUser = await this.usersService.updateUser(id, data);
    return new UserResponse(updatedUser);
  }
}
