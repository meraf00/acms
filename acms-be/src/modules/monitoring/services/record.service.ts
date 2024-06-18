import { ContestService } from '@modules/contest/services/contest.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Record } from '../entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private readonly recordModel: Model<Record>,
    private readonly contestService: ContestService,
  ) {}

  async add(contest: string, fileId: string, user: string) {
    const isActive = await this.contestService.isActive(contest);

    if (!isActive) {
      throw new Error('Contest is not active');
    }

    await this.recordModel.updateOne(
      {
        contest: contest,
        user: user,
      },
      {
        $addToSet: { files: fileId },
      },
      {
        upsert: true,
      },
    );
  }

  async removeFile(recordId: string, fileId: string) {
    return this.recordModel.updateOne(
      {
        _id: recordId,
      },
      {
        $pull: { files: fileId },
      },
    );
  }

  async filterBy(contestId: string, userId: string) {
    return await this.recordModel
      .find({
        contest: contestId,
        user: userId,
      })
      .populate(['files'])
      .exec();
  }
}
