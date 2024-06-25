import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { JwtConfig } from '@shared/config';
import { Model } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../../user/entities/user.entity';

export type JwtPayload = {
  sub: string;
  name: string;
  email: string;
  role: string;
  picture: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    const extractJwtFromCookie = (req) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }

      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<JwtConfig>('jwt')?.secret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userModel
      .findOne({ email: payload.email })
      .populate('profile')
      .exec();

    if (!user) throw new UnauthorizedException('auth_error');

    return user;
  }
}
