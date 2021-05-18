import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { hash } from 'bcrypt';

export const HashPassword = createParamDecorator(async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { body: { password } } = request;
    return await hash(password, parseInt(process.env.SALT_ROUNDS));
});