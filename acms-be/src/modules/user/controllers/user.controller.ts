import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/types/roles';
import { Request } from 'express';
import { Model } from 'mongoose';

import { User, UserDocument } from '../entities/user.entity';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user;
  }

  @Get()
  @UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
  async getAll() {
    return this.userModel.find().populate(['profile']).exec();
  }
}
