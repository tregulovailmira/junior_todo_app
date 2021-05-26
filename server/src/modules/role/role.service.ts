import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from './role.enum';
import { ROLES_KEY } from './role.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesService implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles) {
      return true;
    }
    const {
      headers: { authorization },
    } = context.switchToHttp().getRequest();
    if (authorization) {
      try {
        const user = this.jwtService.verify(authorization.slice(7));
        return roles.some((role) => user['role'].includes(role));
      } catch (error) {
        throw new UnauthorizedException(error.message);
      }
    }
  }
}
