import { CanActivate, ExecutionContext, Type } from '@nestjs/common';

export function RoleGuard(roles: string): Type<CanActivate> {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const allowedRoles = roles.split('|');
      if (allowedRoles.length < 1) {
        return true;
      }

      const request = context.switchToHttp().getRequest();
      const user: any = request.user;
      const userRoles = user?.roles;

      return allowedRoles.some((allowedRole) =>
        userRoles?.find((x: any) => x.key == allowedRole.trim()),
      );
    }
  }

  return RoleGuardMixin;
}
