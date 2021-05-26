import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Req,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from '../attachments.service';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/editFileName.utils';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../role/role.decorator';
import { RoleEnum } from '../../role/role.enum';

@UseGuards(JwtAuthGuard)
@Roles(RoleEnum.User)
@Controller('user/todos/:todoId/attachments')
export class UsersAttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: __dirname + `/../../../temp/`,
        filename: editFileName,
      }),
    }),
  )
  async create(
    @Req() req: any,
    @Param('todoId') todoId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const {
      user: { userId },
    } = req;
    try {
      return await this.attachmentsService.create(
        file.filename,
        +todoId,
        userId,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Req() req: any, @Param('todoId') todoId: string) {
    const {
      user: { userId },
    } = req;
    const isSameUser = await this.attachmentsService.isUsersTodo(
      todoId,
      userId,
    );
    if (!isSameUser) {
      throw new NotFoundException();
    }
    return this.attachmentsService.findAll(+todoId);
  }

  @Get(':id')
  async findOne(
    @Req() req: any,
    @Param('id') id: string,
    @Param('todoId') todoId: string,
  ) {
    const {
      user: { userId },
    } = req;
    const isSameUser = await this.attachmentsService.isUsersTodo(
      todoId,
      userId,
    );
    if (!isSameUser) {
      throw new NotFoundException();
    }
    return this.attachmentsService.findOne(+id, +todoId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(
    @Req() req: any,
    @Param('id') id: string,
    @Param('todoId') todoId: string,
  ) {
    const {
      user: { userId },
    } = req;
    const isSameUser = await this.attachmentsService.isUsersTodo(
      todoId,
      userId,
    );
    if (!isSameUser) {
      throw new NotFoundException();
    }
    return this.attachmentsService.remove(+id, +todoId);
  }
}
