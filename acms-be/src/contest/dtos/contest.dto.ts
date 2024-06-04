import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateContestDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  studentIds: string[];

  @ApiProperty()
  @IsDateString()
  startingTime: Date;

  @ApiProperty()
  @IsDateString()
  endingTime: Date;
}

export class UpdateContestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  studentIds: string[];

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  startingTime: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  endingTime: Date;
}
