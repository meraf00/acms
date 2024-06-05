import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createContestDeletionRequestSchema = z
  .object({
    contest: z.string(),
  })
  .required();

export const updateContestDeletionApprovalSchema = z
  .object({
    approve: z.boolean(),
  })
  .required();

export class CreateContestDeletionRequestDto {
  @ApiProperty({
    type: String,
    example: '665f0cd60e3d9856a54f6b80',
    description: 'Internal id of contest',
  })
  contest: string;
}

export class UpdateContestDeletionApprovalDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Approval status',
  })
  approve: boolean;
}
