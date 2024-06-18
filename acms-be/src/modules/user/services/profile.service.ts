import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityService } from '@shared/services/entity.service';
import { Model } from 'mongoose';

import { Profile } from '../entities/profile.entity';

@Injectable()
export class ProfileService extends EntityService<Profile>(['profile']) {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
  ) {
    super(profileModel);
  }
}
