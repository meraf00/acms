import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createStudentSchema = z
  .object({
    group: z.string(),
    codeforcesHandle: z.string(),
    profile: z.string(),
  })
  .required();

export const updateStudentSchema = createStudentSchema.partial();

export class CreateStudentDto {
  @ApiProperty()
  group: string;

  @ApiProperty()
  codeforcesHandle: string;

  @ApiProperty()
  profile: string;
}

export class UpdateStudentDto {
  @ApiProperty({ required: false })
  group: string;

  @ApiProperty({ required: false })
  codeforcesHandle: string;

  @ApiProperty({ required: false })
  profile: string;
}
