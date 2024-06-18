import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createProfileSchema = z
  .object({
    group: z.string(),
    codeforcesHandle: z.string(),
    profile: z.string(),
  })
  .required();

export const updateProfileSchema = createProfileSchema.partial();

export class CreateProfileDto {
  @ApiProperty()
  group: string;

  @ApiProperty()
  codeforcesHandle: string;

  @ApiProperty()
  profile: string;
}

export class UpdateProfileDto {
  @ApiProperty({ required: false })
  group: string;

  @ApiProperty({ required: false })
  codeforcesHandle: string;

  @ApiProperty({ required: false })
  profile: string;
}
