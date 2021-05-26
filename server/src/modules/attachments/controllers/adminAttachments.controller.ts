import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from '../attachments.service';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/editFileName.utils';
import { Roles } from '../../role/role.decorator';
import { RoleEnum } from '../../role/role.enum';

@Roles(RoleEnum.Admin)
@Controller('admin/todos/:todoId/attachments')
export class AdminAttachmentsController {
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
    @Param('todoId') todoId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.attachmentsService.create(file.filename, +todoId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll(@Param('todoId') todoId: string) {
    return this.attachmentsService.findAll(+todoId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Param('todoId') todoId: string) {
    return this.attachmentsService.findOne(+id, +todoId);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Param('todoId') todoId: string) {
    return this.attachmentsService.remove(+id, +todoId);
  }
}
