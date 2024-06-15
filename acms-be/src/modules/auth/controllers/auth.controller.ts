import { User } from '@modules/user/entities/user.entity';
import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';
import { Request, Response } from 'express';

import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller({ version: ApiVersion.V2, path: 'auth' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.signIn(req.user as unknown as User);

    const frontendUrl = this.configService.get<string>('FRONTEND_URL')!;

    res.cookie('access_token', token, {
      httpOnly: true,
    });

    return res.redirect(HttpStatus.PERMANENT_REDIRECT, frontendUrl);
  }
}
