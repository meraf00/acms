import { CanActivate, ExecutionContext, Type } from '@nestjs/common';

export function RoleGuard(roles: string[]): Type<CanActivate> {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const allowedRoles = roles;
      if (allowedRoles.length < 1) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user: any = request.user;
      const userRole = user?.role;

      return allowedRoles.includes(userRole);
    }
  }

  return RoleGuardMixin;
}
