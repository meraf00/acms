import {
  Contest,
  ContestSchema,
} from '@modules/contest/entities/contest.entity';
import {
  ContestDeletionRequest,
  ContestDeletionRequestSchema,
} from '@modules/contest/entities/contest-deletion-request.entity';
import {
  Record,
  RecordSchema,
} from '@modules/monitoring/entities/record.entity';
import {
  UploadedFile,
  UploadedFileSchema,
} from '@modules/storage/entities/file.entity';
import { Profile, ProfileSchema } from '@modules/user/entities/profile.entity';
import { User, UserSchema } from '@modules/user/entities/user.entity';
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
      {
        name: ContestDeletionRequest.name,
        schema: ContestDeletionRequestSchema,
      },
      {
        name: Record.name,
        schema: RecordSchema,
      },
      {
        name: UploadedFile.name,
        schema: UploadedFileSchema,
      },
      {
        name: Profile.name,
        schema: ProfileSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
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
