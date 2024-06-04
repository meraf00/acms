import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createStudentSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    group: z.string(),
    codeforcesHandle: z.string(),
  })
  .required();

export const updateStudentSchema = createStudentSchema.partial();

export class CreateStudentDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  codeforcesHandle: string;
}

export class UpdateStudentDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  email: string;

  @ApiProperty({ required: false })
  group: string;

  @ApiProperty({ required: false })
  codeforcesHandle: string;
}
