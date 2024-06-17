import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const addRecordSchema = z
  .object({
    contest: z.string(),
    user: z.string(),
    fileId: z.string(),
  })
  .required();

export class AddRecordDto {
  @ApiProperty({
    type: String,
    example: '665f0cd60e3d9856a54f6b80',
    description: 'ID of monitored contest.',
  })
  contest: string;

  @ApiProperty({
    type: String,
    example: '665f0cd60e3d9856a54f6b80',
    description: 'ID of monitored user.',
  })
  user: string;

  @ApiProperty({
    type: String,
    example: '665f0cd60e3d9856a54f6b80',
    description: 'ID of uploaded image.',
  })
  fileId: string[];
}
