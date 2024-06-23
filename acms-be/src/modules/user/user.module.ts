import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProfileController } from './controllers/profile.controller';
import { UserController } from './controllers/user.controller';
import { Profile, ProfileSchema } from './entities/profile.entity';
import { User, UserSchema } from './entities/user.entity';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Profile.name, schema: ProfileSchema },
    ]),
  ],
  controllers: [UserController, ProfileController],
  providers: [ProfileService, UserService],
  exports: [MongooseModule, UserService],
})
export class UserModule {}
