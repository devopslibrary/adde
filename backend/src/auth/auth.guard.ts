import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './interfaces/role.enum';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('role', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const requiredRole = roles[0];
    const account = request.params.account;
    const repo = request.params.repo;
    return this.authService.userHasAccess(
      request.user,
      requiredRole,
      account,
      repo,
    );
  }
}
