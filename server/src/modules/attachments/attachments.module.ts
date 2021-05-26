import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { UsersAttachmentsController } from './usersAttachments.controller';
import { TodoModule } from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentEntity } from './attachment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AdminAttachmentsController } from './adminAttachments.controller';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forFeature([AttachmentEntity]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: __dirname + '/modules/attachments/temp/',
      }),
    }),
  ],
  controllers: [UsersAttachmentsController, AdminAttachmentsController],
  providers: [AttachmentsService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
