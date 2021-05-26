import { Test, TestingModule } from '@nestjs/testing';
import { UsersAttachmentsController } from './usersAttachments.controller';
import { AttachmentsService } from './attachments.service';

describe('AttachmentsController', () => {
  let controller: UsersAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAttachmentsController],
      providers: [AttachmentsService],
    }).compile();

    controller = module.get<UsersAttachmentsController>(
      UsersAttachmentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
