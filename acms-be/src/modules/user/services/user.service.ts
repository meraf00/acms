import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityService } from '@shared/services/entity.service';
import { Model } from 'mongoose';

import { User } from '../entities/user.entity';

@Injectable()
export class UserService extends EntityService<User>(['profile']) {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }
}
