import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { extname } from 'path';

import { FileInfo, S3 } from '../types';

@Injectable()
export class StorageService {
  constructor(private readonly s3: S3) {}

  async upload(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<FileInfo> {
    const ext = extname(file.originalname);

    const normalizedFileName = `${randomUUID()}${ext}`;

    await this.s3.putObject(bucketName, normalizedFileName, file.buffer);

    return {
      objectName: normalizedFileName,
      bucketName,
      contentType: file.mimetype,
      originalName: file.originalname,
    };
  }

  async download(fileInfo: FileInfo, response: Response): Promise<any> {
    const result = await this.s3.getObject(
      fileInfo.bucketName,
      fileInfo.objectName,
    );

    response.setHeader('Content-Type', fileInfo.contentType);
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileInfo.originalName ?? fileInfo.objectName}`,
    );

    return result;
  }

  async generatePresignedDownloadUrl(fileInfo: FileInfo) {
    return await this.s3.presignedGetObject(
      fileInfo.bucketName,
      fileInfo.objectName,
      fileInfo.contentType,
      +process.env.PRESIGNED_URL_EXPIRATION!,
    );
  }

  async generatePresignedUploadUrl(fileInfo: FileInfo) {
    const ext = extname(fileInfo.originalName);

    const nameWithoutExtension = fileInfo.originalName.slice(
      0,
      Math.min(10, fileInfo.originalName.length - ext.length),
    );

    const normalizedFileName = `${nameWithoutExtension}-${Date.now()}-${randomUUID()}${ext}`;

    return await this.s3.presignedPutObject(
      fileInfo.bucketName,
      normalizedFileName,
      fileInfo.contentType,
      +process.env.PRESIGNED_URL_EXPIRATION!,
    );
  }
}
