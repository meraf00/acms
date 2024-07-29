import { Contest } from '@modules/contest/entities/contest.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IMigration } from '@shared/types/migration';
import { Model } from 'mongoose';

import { Migration } from '../entities/migration.entity';
import { AddIsDeletedFieldForSoftDeleteMigration } from '../migrations';

@Injectable()
export class MigrationService {
  private readonly migrations: IMigration[];

  constructor(
    @InjectModel(Contest.name) private readonly contestModel: Model<Contest>,
    @InjectModel(Migration.name)
    private readonly migrationModel: Model<Migration>,
  ) {
    this.migrations = [
      new AddIsDeletedFieldForSoftDeleteMigration(contestModel),
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
