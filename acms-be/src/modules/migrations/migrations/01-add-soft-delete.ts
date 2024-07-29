import { Contest } from '@modules/contest/entities/contest.entity';
import { Model } from 'mongoose';

export class AddIsDeletedFieldForSoftDeleteMigration {
  readonly migrationNumber = 1;

  constructor(private readonly contestModel: Model<Contest>) {}

  async runMigration() {
    await this.contestModel
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
