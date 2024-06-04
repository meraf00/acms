import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createContestSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    students: z.array(z.string()),
    startingTime: z.coerce.date(),
    endingTime: z.coerce.date(),
  })
  .required();

export const updateContestSchema = createContestSchema.partial();

export class CreateContestDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  students: string[];

  @ApiProperty()
  startingTime: Date;

  @ApiProperty()
  endingTime: Date;
}

export class UpdateContestDto {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  students: string[];

  @ApiProperty({ required: false })
  startingTime: Date;

  @ApiProperty({ required: false })
  endingTime: Date;
}
