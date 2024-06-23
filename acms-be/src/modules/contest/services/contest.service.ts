import { UserDocument } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityService } from '@shared/services/entity.service';
import { Model, Types } from 'mongoose';

import { CodeforcesContest } from '../dtos/codeforces-contest.dto';
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
    private readonly userService: UserService,
  ) {
    super(contestModel);
  }

  async create(data: any) {
    const studentIds: string[] = data.students;

    let isCodeforcesHandle = false;

    for (const sid of studentIds) {
      if (!Types.ObjectId.isValid(sid)) {
        isCodeforcesHandle = true;
        break;
      }
    }

    if (isCodeforcesHandle) {
      // If studentIds are not ObjectIds, then they are codeforces handles
      const users = await this.userService.findAll();
      data.students = users
        .filter((user) => studentIds.includes(user.profile.codeforcesHandle))
        .map((user: UserDocument) => user.id);
    }

    if (data.students.length !== studentIds.length) {
      throw new Error('Some students are not registered');
    }

    return await this.contestModel.create(data);
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

  async isActive(contestId: string) {
    const now = Date.now();

    return await this.contestModel.exists({
      _id: contestId,
      startingTime: { $lte: now },
      endingTime: { $gte: now },
    });
  }

  async bulkCreate(contests: CodeforcesContest[]) {
    const contestIds = contests.map((contest) => contest.id.toString());

    const registered = await this.contestModel.find({
      id: { $in: contestIds },
    });

    const newContests = contests.filter(
      (contest) => !registered.some((r) => r.id === contest.id),
    );

    return await this.contestModel.insertMany(newContests);
  }
}
