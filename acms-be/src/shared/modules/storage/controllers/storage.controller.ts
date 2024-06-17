import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response as ExpressResponse } from 'express';

import { StorageService } from '../services/storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload-url')
  async presignedUpload(
    @Body('fileName') fileName: string,
    @Body('contentType') contentType: string,
  ) {
    return await this.storageService.generatePresignedUploadUrl({
      bucketName: process.env.BUCKET_NAME,
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
      bucketName: process.env.BUCKET_NAME,
      filepath: fileName,
      originalname: fileName,
      contentType: contentType,
    });
  }

  @Get('download')
  async downloadFile(@Query() query, @Res() response: ExpressResponse) {
    const result = await this.storageService.download(
      {
        bucketName: query.bucketName,
        filepath: query.fileName,
        contentType: query.contentType,
        originalname: query.originalname,
      },
      response,
    );

    return response.send(result);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.storageService.upload(file, process.env.BUCKET_NAME);
  }
}
