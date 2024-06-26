import { MailService } from '@modules/mail/services/mail.service';
import {
  Profile,
  ProfileDocument,
} from '@modules/user/entities/profile.entity';
import { User, UserDocument } from '@modules/user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private readonly mailService: MailService,
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
      throw new BadRequestException('auth_user_not_found');
    }

    return this.generateJwt({
      sub: userExists.email,
      name: userExists.name,
      role: userExists.role,
      picture: userExists.picture,
      email: userExists.email,
    });
  }

  // async registerUser(user: UserDto) {
  //   try {
  //     const profile = await this.profileModel.create({
  //       group: 'N/A',
  //       codeforcesHandle: 'N/A',
  //     });

  //     const newUser = await this.userModel.create({
  //       ...user,
  //       role: Roles.student,
  //       profile: profile._id,
  //     });

  //     return this.generateJwt({
  //       sub: newUser.email,
  //       email: newUser.email,
  //       role: newUser.role,
  //       name: newUser.name,
  //       picture: newUser.picture,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     throw new InternalServerErrorException();
  //   }
  // }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  }

  async sendEmailToken(email: string) {
    const userExists = await this.findUserByEmail(email);

    if (!userExists) {
      throw new BadRequestException('auth_user_not_found');
    }

    const token = this.jwtService.sign(
      {
        sub: userExists.email,
        name: userExists.name,
        role: userExists.role,
        picture: userExists.picture,
        email: userExists.email,
      },
      {
        expiresIn: '5m',
      },
    );

    await this.mailService.sendEmailToken(email, {
      name: userExists.name,
      loginLink: `${process.env.CLIENT_URL}/auth/otp/${token}`,
      year: new Date().getFullYear(),
    });
  }

  async verifyEmailToken(token: string) {
    const decoded = this.jwtService.verify(token);
    if (decoded) {
      return decoded;
    }
  }
}
