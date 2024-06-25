import { ApiProperty } from '@nestjs/swagger';

export class ReportIssueDto {
  @ApiProperty({ required: false })
  type: string;

  @ApiProperty({ required: false })
  message: string;
}
