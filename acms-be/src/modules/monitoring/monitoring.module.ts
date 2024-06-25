import { ContestModule } from '@modules/contest/contest.module';
import { UploadedFileSchema } from '@modules/storage/entities/file.entity';
import { StorageModule } from '@modules/storage/storage.module';
import { Global, Module, UploadedFile } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecordController } from './controllers/record.controller';
import { Record, RecordSchema } from './entities/record.entity';
import { RecordService } from './services/record.service';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Record.name, schema: RecordSchema },
      {
        name: UploadedFile.name,
        schema: UploadedFileSchema,
      },
    ]),
    ContestModule,
    StorageModule,
  ],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class MonitoringModule {}
