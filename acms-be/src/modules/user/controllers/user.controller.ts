import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/types/roles';
import { Request } from 'express';

import { UserService } from '../services/user.service';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user;
  }

  @Get()
  @UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
  async getAll() {
    return this.userService.findAll();
  }
}
