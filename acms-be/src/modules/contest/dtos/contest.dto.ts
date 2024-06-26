import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';

export const createContestSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    invitationLink: z.string().url(),
    students: z.array(z.string()),
    startingTime: z.coerce.date(),
    endingTime: z.coerce.date(),
  })
  .required();

export const updateContestSchema = createContestSchema.partial();

export class CreateContestDto {
  @ApiProperty({
    type: String,
    example: '551155',
    description: 'Codeforces given id of the contest',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'A2SV In Person Contest #1',
    description: 'Name of the contest',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'https://codeforces.com/contest/551155/invitation',
    description: 'Invitation link of the contest',
  })
  invitationLink: string;

  @ApiProperty({
    type: [String],
    example: ['665f0cd60e3d9856a54f6b80', '665f0cd60e3d9856a54f6b80'],
    description: 'Array of student ids',
  })
  students: string[];

  @ApiProperty({
    type: Date,
    format: 'date-time',
    example: '2021-10-20T00:00:00.000Z',
    description: 'Starting time of the contest',
  })
  startingTime: Date;

  @ApiProperty({
    type: Date,
    format: 'date-time',
    example: '2021-10-20T00:00:00.000Z',
    description: 'Ending time of the contest',
  })
  endingTime: Date;
}

export class UpdateContestDto {
  @ApiProperty({ required: false })
  id: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  invitationLink: string;

  @ApiProperty({ required: false })
  students: string[];

  @ApiProperty({ required: false })
  startingTime: Date;

  @ApiProperty({ required: false })
  endingTime: Date;
}
