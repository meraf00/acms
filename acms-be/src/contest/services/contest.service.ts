import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contest } from '../entities/contest.entity';
import { Model } from 'mongoose';
import { EntityService } from 'src/shared/services/entity.service';

@Injectable()
export class ContestService extends EntityService<Contest>(['students']) {
  constructor(
    @InjectModel(Contest.name) private readonly contestModel: Model<Contest>,
  ) {
    super(contestModel);
  }
}
