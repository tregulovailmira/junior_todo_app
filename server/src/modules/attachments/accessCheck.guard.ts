import {
  CanActivate,
  Injectable,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { AttachmentsService } from './attachments.service';

@Injectable()
export class AccessCheckStrategy implements CanActivate {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const {
      user: { userId },
      params: { todoId },
    } = await context.switchToHttp().getRequest();
    try {
      return await this.attachmentsService.isUsersTodo(todoId, userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
