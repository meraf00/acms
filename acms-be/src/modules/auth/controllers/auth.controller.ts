import { User } from '@modules/user/entities/user.entity';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ClientConfig, JwtConfig } from '@shared/config';
import { ApiVersion } from '@shared/types/version';
import { Request, Response } from 'express';

import { UserDto } from '../dtos/requests.dto';
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

    const clientSuccessUrl =
      this.configService.get<ClientConfig>('client')!.authSuccessUrl;

    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: this.configService.get<JwtConfig>('jwt')!.expirationMs,
    });

    return res.redirect(HttpStatus.PERMANENT_REDIRECT, clientSuccessUrl);
  }

  @ApiBody({ type: UserDto })
  @Post('email')
  async emailAuthRequest(@Body() dto: UserDto) {
    const email = dto.email as string;

    await this.authService.sendEmailToken(email);
  }

  @Get('otp/:token')
  async emailAuth(@Param('token') token: string, @Res() res: Response) {
    try {
      const decoded = await this.authService.verifyEmailToken(token);
      const newToken = await this.authService.signIn(
        decoded as unknown as User,
      );
      const clientSuccessUrl =
        this.configService.get<ClientConfig>('client')!.authSuccessUrl;

      res.cookie('access_token', newToken, {
        httpOnly: true,
        maxAge: this.configService.get<JwtConfig>('jwt')!.expirationMs,
      });

      return res.redirect(HttpStatus.PERMANENT_REDIRECT, clientSuccessUrl);
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('auth_invalid_token');
    }
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    return res.sendStatus(HttpStatus.OK);
  }
}
