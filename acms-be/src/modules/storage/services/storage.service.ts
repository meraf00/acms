import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { StorageConfig } from '@shared/config';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { Model } from 'mongoose';
import { extname } from 'path';

import { UploadedFile } from '../entities/file.entity';
import { FileInfo } from '../types';
import { DecodedToken } from '../types/confirmation';
import { S3 } from './s3.service';

@Injectable()
export class StorageService {
  private readonly presignedUrlTTL: number;

  constructor(
    private readonly s3: S3,
    private readonly configService: ConfigService,
    @InjectModel(UploadedFile.name)
    private readonly uploadedFileModel: Model<UploadedFile>,
    private readonly jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {
    this.presignedUrlTTL =
      this.configService.get<StorageConfig>('storage')!.presignedUrlTTL;
  }

  normalizeFileName(fileName: string) {
    const ext = extname(fileName);

    const nameWithoutExtension = fileName.slice(
      0,
      Math.min(10, fileName.length - ext.length),
    );

    return `${nameWithoutExtension}-${Date.now()}-${randomUUID()}${ext}`;
  }

  async bufferedUpload(
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

  async bufferedDownload(fileInfo: FileInfo, response: Response): Promise<any> {
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

  async generatePresignedDownloadUrl(fileId: string) {
    const fileInfo = await this.uploadedFileModel.findById(fileId);

    if (!fileInfo) {
      throw new Error('File not found');
    }

    return await this.s3.presignedGetObject(
      fileInfo.bucketName,
      fileInfo.objectName!,
      fileInfo.contentType,
      this.presignedUrlTTL,
    );
  }

  async generatePresignedDownloadUrlForFileInfo(fileInfo: FileInfo) {
    return await this.s3.presignedGetObject(
      fileInfo.bucketName,
      fileInfo.objectName!,
      fileInfo.contentType,
      this.presignedUrlTTL,
    );
  }

  async generatePresignedUploadUrl(fileInfo: FileInfo) {
    const normalizedFileName = this.normalizeFileName(fileInfo.originalName);

    return {
      fileName: normalizedFileName,
      presignedUrl: await this.s3.presignedPutObject(
        fileInfo.bucketName,
        normalizedFileName,
        fileInfo.contentType,
        this.presignedUrlTTL,
      ),
    };
  }

  async generateConfirmUploadToken(
    fileInfo: FileInfo,
    action: string,
    extra: any = {},
  ) {
    return await this.jwtService.signAsync({
      fileInfo,
      action,
      extra,
    });
  }

  async confirmUpload(token: string) {
    const data = await this.jwtService.verifyAsync<DecodedToken>(token);

    if (!data) {
      throw new Error('Invalid token');
    }

    const { fileInfo, action, extra } = data;

    const result = await this.uploadedFileModel.create(fileInfo);

    const fileId = result._id;

    this.eventEmitter.emitAsync(action, {
      fileId,
      extra,
    });
  }
}
