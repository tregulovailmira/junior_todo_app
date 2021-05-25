import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { TodoModule } from '../todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentEntity } from './attachment.entity';
import { MulterModule } from '@nestjs/platform-express';

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
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
