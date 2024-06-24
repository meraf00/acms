import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
