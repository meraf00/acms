import { ContestService } from '@modules/contest/services/contest.service';
import { StorageService } from '@modules/storage/services/storage.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Record } from '../entities/record.entity';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Record.name) private readonly recordModel: Model<Record>,
    private readonly contestService: ContestService,
    private readonly storageService: StorageService,
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

  async filterBy(contestId: string | null, userId: string | null) {
    if (!contestId && !userId) {
      throw new Error('Invalid contest or user id');
    } else if (!contestId) {
      return await this.recordModel
        .find({
          user: userId,
        })
        .populate(['files'])
        .exec();
    } else if (!userId) {
      return await this.recordModel
        .find({
          contest: contestId,
        })
        .populate(['files'])
        .exec();
    }
    return await this.recordModel
      .find({
        contest: contestId,
        user: userId,
      })
      .populate(['files'])
      .exec();
  }

  async getRecordImages(contestId: string, userId: string) {
    const records = await this.filterBy(contestId, userId);

    return await Promise.all(
      records.flatMap((record) => {
        return record.files.map((file) => {
          return this.storageService.generatePresignedDownloadUrlForFileInfo(
            file,
          );
        });
      }),
    );
  }
}
