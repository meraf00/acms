import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createUploadPresignedUrlSchema = z
  .object({
    fileName: z.string(),
    contentType: z.string(),
  })
  .required();

export class CreateContestDto {
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
}
