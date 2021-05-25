import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttachmentEntity } from './attachment.entity';
import { Repository } from 'typeorm';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { TodoService } from '../todo/todo.service';
import { deleteFileFromTemp } from './utils/deleteFile.util';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(AttachmentEntity)
    private readonly attachmentRepository: Repository<AttachmentEntity>,
    private readonly todoService: TodoService,
    private readonly configService: ConfigService,
  ) {}

  public async create(
    fileName: string,
    todoId: number,
  ): Promise<AttachmentEntity> {
    const newAttachment = this.attachmentRepository.create();
    const bucketName = this.configService.get('ATTACHMENT_BUCKET_NAME');
    const filePath = __dirname + `/temp/` + fileName;
    const storage = new Storage();

    try {
      const { userId } = await this.todoService.findOne(todoId);
      const destinationForGS = `user${userId}/todo${todoId}/` + fileName;

      newAttachment.link = `https://storage.cloud.google.com/${bucketName}/user${userId}/todo${todoId}/${fileName}`;
      newAttachment.filePath = destinationForGS;
      newAttachment.todoId = todoId;
      const createdAttachment = await this.attachmentRepository.save(
        newAttachment,
      );

      await storage
        .bucket(bucketName)
        .upload(filePath, { destination: destinationForGS });

      return createdAttachment;
    } catch (error) {
      await this.attachmentRepository.delete({ link: newAttachment.link });
      throw new BadRequestException(error.message);
    } finally {
      try {
        await deleteFileFromTemp(filePath);
      } catch (error) {
        console.log(error);
      }
    }
  }

  public async findAll(todoId: string): Promise<AttachmentEntity[]> {
    try {
      return await this.attachmentRepository.find({ where: { todoId } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findOne(id: number, todoId: number): Promise<AttachmentEntity> {
    const foundAttachment = await this.attachmentRepository.findOne({
      where: { id, todoId },
    });
    if (foundAttachment) {
      return foundAttachment;
    }
    throw new NotFoundException('Attachment not found');
  }

  public async remove(id: number, todoId: number): Promise<void> {
    const foundAttachment = await this.attachmentRepository.findOne({
      where: { id, todoId },
    });
    const storage = new Storage();
    const bucketName = this.configService.get('ATTACHMENT_BUCKET_NAME');
    try {
      if (!foundAttachment) {
        throw new NotFoundException("Can't delete attachment with this id");
      }

      const { affected } = await this.attachmentRepository.delete({
        id,
        todoId,
      });

      if (affected === 0) {
        throw new BadRequestException("Can't delete attachment with this id");
      }

      await storage.bucket(bucketName).file(foundAttachment.filePath).delete();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
