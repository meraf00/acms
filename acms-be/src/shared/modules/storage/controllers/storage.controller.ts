import { Body, Controller, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody } from '@nestjs/swagger';
import { StorageConfig } from '@shared/config';

import { StorageService } from '../services/storage.service';

@Controller('storage')
export class StorageController {
  private readonly bucketName: string;

  constructor(
    private readonly storageService: StorageService,
    private readonly configService: ConfigService,
  ) {
    this.bucketName =
      this.configService.get<StorageConfig>('storage')!.bucketName;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileName: {
          type: 'string',
          description: 'Name of the file',
        },
        contentType: {
          type: 'string',
          description: 'Content type of the file',
        },
      },
    },
  })
  @Post('upload-url')
  async presignedUpload(
    @Body('fileName') fileName: string,
    @Body('contentType') contentType: string,
  ) {
    return await this.storageService.generatePresignedUploadUrl({
      bucketName: this.bucketName,
      originalName: fileName,
      contentType: contentType,
    });
  }

  @Post('download-url')
  async getPresignedDownloadUrl(
    @Body('fileName') fileName: string,
    @Body('contentType') contentType: string,
  ) {
    return await this.storageService.generatePresignedDownloadUrl({
      bucketName: this.bucketName,
      objectName: fileName,
      originalName: fileName,
      contentType: contentType,
    });
  }
}
