import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AddRecordDto } from '../dtos/record.dto';
import { Record } from '../entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private readonly recordModel: Model<Record>,
  ) {}

  async add(recordDto: AddRecordDto) {
    const { contest, user, fileId } = recordDto;

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
