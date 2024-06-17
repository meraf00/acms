import { Module } from '@nestjs/common';

import { StorageController } from './controllers/storage.controller';
import { S3 } from './services/s3.service';
import { StorageService } from './services/storage.service';

@Module({
  providers: [
    S3,
    // TODO: Implement GCS service without S3 interoperability (@google-cloud/storage)
    // (if absolutely necessary)

    StorageService,
  ],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
