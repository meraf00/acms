import { Contest } from '@modules/contest/entities/contest.entity';
import { ContestDeletionRequest } from '@modules/contest/entities/contest-deletion-request.entity';
import { Record } from '@modules/monitoring/entities/record.entity';
import { UploadedFile } from '@modules/storage/entities/file.entity';
import { Profile } from '@modules/user/entities/profile.entity';
import { User } from '@modules/user/entities/user.entity';
import { Model } from 'mongoose';

export class AddIsDeletedFieldForSoftDeleteForAllEntitiesMigration {
  readonly migrationNumber = 2;

  constructor(
    private readonly contestModel: Model<Contest>,
    private readonly contestDeletionRequestModel: Model<ContestDeletionRequest>,
    private readonly recordModel: Model<Record>,
    private readonly fileModel: Model<UploadedFile>,
    private readonly profileModel: Model<Profile>,
    private readonly userModel: Model<User>,
  ) {}

  async runMigration() {
    const models = [
      this.contestModel,
      this.contestDeletionRequestModel,
      this.recordModel,
      this.fileModel,
      this.profileModel,
      this.userModel,
    ];

    for (const model of models) {
      await model
        .updateMany(
          {
            isDeleted: { $exists: false },
          },
          {
            $set: {
              isDeleted: false,
            },
          },
        )
        .exec();
    }
  }
}
