import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@modules/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request) {
    const token = await this.authService.signIn(req.user as unknown as User);

    return token;
  }
}
