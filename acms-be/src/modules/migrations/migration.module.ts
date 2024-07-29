import {
  Contest,
  ContestSchema,
} from '@modules/contest/entities/contest.entity';
import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Migration, MigrationSchema } from './entities/migration.entity';
import { MigrationService } from './services/migration.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contest.name, schema: ContestSchema },
      {
        name: Migration.name,
        schema: MigrationSchema,
      },
    ]),
  ],
  providers: [MigrationService],
})
export class MigrationModule implements OnModuleInit {
  constructor(private readonly migrationService: MigrationService) {}

  onModuleInit() {
    this.migrationService.runMigrations();
  }
}
