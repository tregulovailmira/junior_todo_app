import {
  CanActivate,
  Injectable,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';

@Injectable()
export class AccessCheckStrategy implements CanActivate {
  constructor(private readonly todoService: TodoService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user: { userId },
      params: { id },
    } = await context.switchToHttp().getRequest();
    try {
      const todo = await this.todoService.findOneForUser(id, userId);
      return todo.userId === userId;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
