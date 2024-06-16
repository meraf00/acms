import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityService } from '@shared/services/entity.service';
import { Model } from 'mongoose';

import { Contest } from '../entities/contest.entity';

@Injectable()
export class ContestService extends EntityService<Contest>({
  path: 'students',
  populate: {
    path: 'profile',
  },
}) {
  constructor(
    @InjectModel(Contest.name) private readonly contestModel: Model<Contest>,
  ) {
    super(contestModel);
  }

  async getActiveContests() {
    const now = Date.now();

    return await this.contestModel
      .find({
        startingTime: { $lte: now },
        endingTime: { $gte: now },
      })
      .populate({
        path: 'students',
        populate: {
          path: 'profile',
        },
      })
      .exec();
  }
}
