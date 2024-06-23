import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@shared/types/base-response';
import { z } from 'zod';

export const presignedUrlSchema = z
  .object({
    fileName: z.string(),
    contentType: z.string(),
    action: z.string(),
    extra: z.record(z.string().optional(), z.string().optional()).optional(),
  })
  .required();

export class PresignedUrlDto<T> {
  @ApiProperty({
    type: String,
    example: 'screenshot.jpeg',
    description: 'Name of the file to be uploaded.',
  })
  fileName: string;

  @ApiProperty({
    type: String,
    example: 'image/jpeg',
    description: 'MIME type of the file to be uploaded.',
  })
  contentType: string;

  @ApiProperty({
    type: String,
    example: 'monitoring.record.uploaded',
    description: 'Type of operation.',
  })
  action: string;

  @ApiProperty({
    type: Object,
    description: 'Extra data.',
  })
  extra: T;
}

export class PresignedUrlResponseData {
  @ApiProperty({
    type: String,
    example: 'https://s3.localhost:3000/screenshot.jpeg?...',
    description: 'Presigned URL for uploading the file.',
  })
  presignedUrl: string;

  @ApiProperty({
    type: String,
    example: 'screenshot-123-8475983745.jpeg',
    description: 'Normalized name of the file to be uploaded.',
  })
  fileName: string;

  @ApiProperty({
    type: String,
    example: 'image/jpeg',
    description: 'MIME type of the file to be uploaded.',
  })
  contentType: string;

  constructor(presignedUrl: string, fileName: string, contentType: string) {
    this.presignedUrl = presignedUrl;
    this.fileName = fileName;
    this.contentType = contentType;
  }
}

export class PresignedUrlResponse
  implements BaseResponse<PresignedUrlResponseData>
{
  @ApiProperty({
    type: Number,
    example: 200,
    description: 'HTTP status code.',
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    example: 'Presigned URL generated successfully.',
    description: 'Response message.',
  })
  message: string;

  @ApiProperty({
    type: PresignedUrlResponseData,
    description: 'Response data.',
  })
  data: PresignedUrlResponseData;
}
