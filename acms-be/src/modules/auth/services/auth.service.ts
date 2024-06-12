import { User, UserDocument } from '@modules/user/entities/user.entity';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Roles } from '@shared/types/roles';
import { Model } from 'mongoose';

import { RegisterUserDto } from '../dtos/requests.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  generateJwt(payload: any) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: User) {
    if (!user) {
      throw new BadRequestException('auth_unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.email,
      email: userExists.email,
    });
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.userModel.create({
        ...user,
        role: Roles.student,
      });

      return this.generateJwt({
        sub: newUser.email,
        email: newUser.email,
      });
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }
}
