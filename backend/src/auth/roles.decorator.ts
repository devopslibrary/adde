import { SetMetadata, UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './roles.guard';
import { Role } from './interfaces/role.enum';

export function Auth(...role: Role[]) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(AuthGuard('bearer'), RolesGuard),
  );
}
