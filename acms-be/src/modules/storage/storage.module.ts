import { Module, UploadedFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtConfig } from '@shared/config';

import { StorageController } from './controllers/storage.controller';
import { UploadedFileSchema } from './entities/file.entity';
import { S3 } from './services/s3.service';
import { StorageService } from './services/storage.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UploadedFile.name, schema: UploadedFileSchema },
    ]),

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<JwtConfig>('jwt')?.secret,
          signOptions: {
            expiresIn: '600s',
          },
        };
      },
    }),
  ],

  providers: [
    S3,
    // TODO: Implement GCS service without S3 interoperability (@google-cloud/storage)
    // (if absolutely necessary)

    StorageService,
  ],

  controllers: [StorageController],
  exports: [StorageService, MongooseModule],
})
export class StorageModule {}
