import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TodoModule } from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentEntity } from './attachment.entity';

@Module({
  imports: [TodoModule, TypeOrmModule.forFeature([AttachmentEntity])],
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
})
export class AttachmentsModule {}
