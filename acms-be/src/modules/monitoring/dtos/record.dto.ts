import { ApiProperty } from '@nestjs/swagger';

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
    description: 'ID of uploaded image.',
  })
  fileId: string[];
}
