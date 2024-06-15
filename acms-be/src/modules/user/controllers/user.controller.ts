import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Model } from 'mongoose';

import { User, UserDocument } from '../entities/user.entity';

@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Get('me')
  async getMe(@Req() req: Request) {
    return req.user;
  }
}
