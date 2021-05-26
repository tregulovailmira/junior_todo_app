import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttachmentEntity } from './attachment.entity';
import { Repository, Connection, QueryRunner } from 'typeorm';
import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { TodoService } from '../todo/todo.service';
import { deleteFileFromTemp } from './utils/deleteFile.util';

@Injectable()
export class AttachmentsService implements OnModuleInit {
  constructor(
    @InjectRepository(AttachmentEntity)
    private readonly attachmentRepository: Repository<AttachmentEntity>,
    private readonly todoService: TodoService,
    private readonly configService: ConfigService,
    private readonly connection: Connection,
  ) {}

  public async create(
    fileName: string,
    todoId: number,
    userId?: number,
  ): Promise<AttachmentEntity> {
    const bucketName = this.configService.get('ATTACHMENT_BUCKET_NAME');
    const filePath = __dirname + `/../../temp/` + fileName;
    const storage = new Storage();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const todo = await this.todoService.findOne(todoId);
      userId = userId ? userId : todo.userId;
      if (todo.userId !== userId) {
        throw new NotFoundException('Todo with this id not found!');
      }
      const destinationForGS = `user${userId}/todo${todoId}/` + fileName;

      await storage
        .bucket(bucketName)
        .upload(filePath, { destination: destinationForGS });

      const createdAttachment = await this.createNewAttachmentAtDb(
        queryRunner,
        bucketName,
        userId,
        todoId,
        fileName,
        destinationForGS,
      );
      await queryRunner.commitTransaction();
      return createdAttachment;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      try {
        await deleteFileFromTemp(filePath);
      } catch (error) {
        console.log(error);
      }
    }
  }

  private async createNewAttachmentAtDb(
    queryRunner: QueryRunner,
    bucketName: string,
    userId: number,
    todoId: number,
    fileName: string,
    destinationForGS: string,
  ): Promise<AttachmentEntity> {
    const newAttachment = this.attachmentRepository.create();
    newAttachment.link = `https://storage.cloud.google.com/${bucketName}/user${userId}/todo${todoId}/${fileName}`;
    newAttachment.filePath = destinationForGS;
    newAttachment.todoId = todoId;
    return await queryRunner.manager.save<AttachmentEntity>(newAttachment);
  }

  public async findAll(
    todoId: number,
    userId?: number,
  ): Promise<AttachmentEntity[]> {
    try {
      if (userId) {
        const isSameUser = await this.isUsersTodo(todoId, userId);
        if (!isSameUser) {
          throw new NotFoundException();
        }
      }
      return await this.attachmentRepository.find({ where: { todoId } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  public async findOne(
    id: number,
    todoId: number,
    userId?: number,
  ): Promise<AttachmentEntity> {
    if (userId) {
      const isSameUser = await this.isUsersTodo(todoId, userId);
      if (!isSameUser) {
        throw new NotFoundException();
      }
    }
    const foundAttachment = await this.attachmentRepository.findOne({
      where: { id, todoId },
    });
    if (foundAttachment) {
      return foundAttachment;
    }
    throw new NotFoundException('Attachment not found');
  }

  public async remove(
    id: number,
    todoId: number,
    userId?: number,
  ): Promise<void> {
    const foundAttachment = await this.attachmentRepository.findOne({
      where: { id, todoId },
    });
    if (userId) {
      const isSameUser = await this.isUsersTodo(todoId, userId);
      if (!isSameUser) {
        throw new NotFoundException();
      }
    }
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

  private async isUsersTodo(todoId, userId): Promise<boolean> {
    const todo = await this.todoService.findOneForUser(todoId, userId);
    return todo.userId === userId;
  }

  async onModuleInit() {
    const storage = new Storage();
    const bucketName = this.configService.get('ATTACHMENT_BUCKET_NAME');
    const storageClass = 'standard';
    const location = 'EU';
    const [buckets] = await storage.getBuckets();
    const foundBucket = buckets.find((bucket) => bucket.name === bucketName);

    if (!foundBucket) {
      try {
        const [bucket] = await storage.createBucket(bucketName, {
          location,
          [storageClass]: true,
        });
        console.log(
          `${bucket.name} created with ${storageClass} class in ${location}`,
        );
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(error.message);
      }
    }
  }
}
