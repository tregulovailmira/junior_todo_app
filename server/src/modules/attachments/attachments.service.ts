import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttachmentEntity } from './attachment.entity';
import { Repository, Connection } from 'typeorm';
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
  ): Promise<AttachmentEntity> {
    const bucketName = this.configService.get('ATTACHMENT_BUCKET_NAME');
    const filePath = __dirname + `/temp/` + fileName;
    const storage = new Storage();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { userId } = await this.todoService.findOne(todoId);
      const destinationForGS = `user${userId}/todo${todoId}/` + fileName;

      const newAttachment = this.attachmentRepository.create();
      newAttachment.link = `https://storage.cloud.google.com/${bucketName}/user${userId}/todo${todoId}/${fileName}`;
      newAttachment.filePath = destinationForGS;
      newAttachment.todoId = todoId;
      const createdAttachment =
        await queryRunner.manager.save<AttachmentEntity>(newAttachment);

      await storage
        .bucket('bucketName')
        .upload(filePath, { destination: destinationForGS });

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
