import { User } from '@modules/user/entities/user.entity';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { Request } from 'express';

import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller({ version: ApiVersion.V2, path: 'auth' })
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
