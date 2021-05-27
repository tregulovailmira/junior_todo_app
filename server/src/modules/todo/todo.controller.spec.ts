import { Test, TestingModule } from '@nestjs/testing';
import { UsersTodoController } from './controllers/usersTodo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: UsersTodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<UsersTodoController>(UsersTodoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
