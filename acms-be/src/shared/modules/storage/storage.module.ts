import { Module } from '@nestjs/common';

import { StorageController } from './controllers/storage.controller';
import { GoogleCloudStorageS3 } from './services/s3.service';
import { StorageService } from './services/storage.service';
import { S3 } from './types';

@Module({
  providers: [
    /** Using Google Cloud Storage with S3 interoperability */
    {
      provide: S3,
      useClass: GoogleCloudStorageS3,
    },
    // TODO: Implement GCS service without S3 interoperability (@google-cloud/storage)
    // (if absolutely necessary)

    StorageService,
  ],
  controllers: [StorageController],
  exports: [StorageService],
})
export class StorageModule {}
