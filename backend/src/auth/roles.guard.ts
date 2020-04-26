import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './interfaces/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly httpService: HttpService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<Role[]>('role', context.getHandler());
    if (!roles) {
      return true;
    }
    const role = roles[0];
    const request = context.switchToHttp().getRequest();
    const username = request.user.login;
    const token = request.user.token;
    const account = request.params.account;
    const repo = request.params.repo;
    const usersPermissionsOnRepo = await this.httpService
      .get(
        'https://api.github.com/repos/' +
          account +
          '/' +
          repo +
          '/collaborators/' +
          username +
          '/permission',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.machine-man-preview+json',
          },
        },
      )
      .toPromise()
      .then((response) => {
        return response.data.permission;
      });
    switch (role) {
      case Role.admin: {
        return usersPermissionsOnRepo == 'admin';
      }
      case Role.write: {
        return (
          usersPermissionsOnRepo == 'admin' || usersPermissionsOnRepo == 'write'
        );
      }
      case Role.read: {
        return (
          usersPermissionsOnRepo == 'admin' ||
          usersPermissionsOnRepo == 'write' ||
          usersPermissionsOnRepo == 'read'
        );
      }
    }
  }
}
