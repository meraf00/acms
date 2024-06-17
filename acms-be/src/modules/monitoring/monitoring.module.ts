import { UploadedFileSchema } from '@modules/storage/entities/file.entity';
import { Module, UploadedFile } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RecordController } from './controllers/record.controller';
import { Record, RecordSchema } from './entities/record.entity';
import { RecordService } from './services/record.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Record.name, schema: RecordSchema },
      {
        name: UploadedFile.name,
        schema: UploadedFileSchema,
      },
    ]),
  ],
  controllers: [RecordController],
  providers: [RecordService],
})
export class MonitoringModule {}
