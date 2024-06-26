import {
  DeleteObjectCommand,
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageConfig } from '@shared/config';

import { FileNotFoundException } from '../exceptions';

@Injectable()
export class S3 {
  private readonly s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    const storage = this.configService.get<StorageConfig>('storage')!;

    this.s3 = new S3Client({
      credentials: {
        accessKeyId: storage.s3.accessKeyId,
        secretAccessKey: storage.s3.secretAccessKey,
      },
      region: 'asia-south1',
      endpoint: storage.s3.endpoint,
      forcePathStyle: true,
    });
  }

  async presignedPutObject(
    bucketName: string,
    objectName: string,
    contentType: string,
    duration: number,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectName,
      ContentType: contentType,
    });

    return await getSignedUrl(this.s3, command, {
      expiresIn: duration,
      signingDate: new Date(),
    });
  }

  async presignedGetObject(
    bucketName: string,
    objectName: string,
    contentType: string,
    duration: number,
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectName,
    });

    try {
      return await getSignedUrl(this.s3, command, { expiresIn: duration });
    } catch (e) {
      if (e instanceof NoSuchKey) {
        throw new FileNotFoundException(objectName);
      }
      throw e;
    }
  }

  async deleteObject(bucketName: string, objectName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: objectName,
    });

    await this.s3.send(command);
  }

  async getObject(bucketName: string, objectName: string): Promise<any> {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: objectName,
    });

    try {
      const response = await this.s3.send(command);
      const data = await response.Body?.transformToByteArray();
      if (data === undefined) throw new Error('Failed to get object data');
      return Buffer.from(data);
    } catch (e) {
      if (e instanceof NoSuchKey) {
        throw new FileNotFoundException(objectName);
      }
      throw e;
    }
  }

  async putObject(
    bucketName: string,
    objectName: string,
    data: Buffer,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: objectName,
      Body: data,
    });

    await this.s3.send(command);
  }
}
