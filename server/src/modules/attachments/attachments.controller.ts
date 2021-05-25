import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { diskStorage } from 'multer';
import { editFileName } from './editFileName.utils';

@Controller('todos/:todoId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: __dirname + `/temp/`,
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
    return this.attachmentsService.findAll(todoId);
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
