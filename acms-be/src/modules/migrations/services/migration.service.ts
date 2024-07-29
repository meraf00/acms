import { Contest } from '@modules/contest/entities/contest.entity';
import { ContestDeletionRequest } from '@modules/contest/entities/contest-deletion-request.entity';
import { Record } from '@modules/monitoring/entities/record.entity';
import { UploadedFile } from '@modules/storage/entities/file.entity';
import { Profile } from '@modules/user/entities/profile.entity';
import { User } from '@modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMigration } from '@shared/types/migration';
import { Model } from 'mongoose';

import { Migration } from '../entities/migration.entity';
import { AddIsDeletedFieldForSoftDeleteMigration } from '../migrations';
import { AddIsDeletedFieldForSoftDeleteForAllEntitiesMigration } from '../migrations/02-add-soft-delete-all-entities';

@Injectable()
export class MigrationService {
  private readonly migrations: IMigration[];

  constructor(
    @InjectModel(Contest.name) private readonly contestModel: Model<Contest>,
    @InjectModel(Migration.name)
    private readonly migrationModel: Model<Migration>,
    @InjectModel(ContestDeletionRequest.name)
    private readonly contestDeletionRequestModel: Model<ContestDeletionRequest>,
    @InjectModel(Record.name) private readonly recordModel: Model<Record>,
    @InjectModel(UploadedFile.name)
    private readonly fileModel: Model<UploadedFile>,
    @InjectModel(Profile.name) private readonly profileModel: Model<Profile>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    this.migrations = [
      new AddIsDeletedFieldForSoftDeleteMigration(contestModel),
      new AddIsDeletedFieldForSoftDeleteForAllEntitiesMigration(
        contestModel,
        contestDeletionRequestModel,
        recordModel,
        fileModel,
        profileModel,
        userModel,
      ),
    ];
  }

  async runMigrations() {
    this.migrations.sort((a, b) => a.migrationNumber - b.migrationNumber);

    const currentMigrationNumber = await this.migrationModel.countDocuments();

    for (const migration of this.migrations) {
      if (migration.migrationNumber > currentMigrationNumber) {
        await migration.runMigration();
        await this.migrationModel.create({
          name: migration.constructor.name,
          migrationNumber: migration.migrationNumber,
        });
      }
    }
  }
}
