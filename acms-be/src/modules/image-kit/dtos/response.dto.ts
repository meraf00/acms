import { ApiProperty } from '@nestjs/swagger';

export class PresignedParams {
  @ApiProperty()
  token: string;

  @ApiProperty()
  expire: number;

  @ApiProperty()
  signature: string;
}
