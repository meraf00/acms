import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { extname } from 'path';

import { FileInfo, S3 } from '../types';

@Injectable()
export class StorageService {
  constructor(private readonly s3: S3) {}

  normalizeFileName(fileName: string) {
    const ext = extname(fileName);

    const nameWithoutExtension = fileName.slice(
      0,
      Math.min(10, fileName.length - ext.length),
    );

    return `${nameWithoutExtension}-${Date.now()}-${randomUUID()}${ext}`;
  }

  async upload(
    file: Express.Multer.File,
    bucketName: string,
  ): Promise<FileInfo> {
    const normalizedFileName = this.normalizeFileName(file.originalname);

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
      fileInfo.objectName!,
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
      fileInfo.objectName!,
      fileInfo.contentType,
      60480,
    );
  }

  async generatePresignedUploadUrl(fileInfo: FileInfo) {
    const normalizedFileName = this.normalizeFileName(fileInfo.originalName);

    return await this.s3.presignedPutObject(
      fileInfo.bucketName,
      normalizedFileName,
      fileInfo.contentType,
      60480,
    );
  }
}
