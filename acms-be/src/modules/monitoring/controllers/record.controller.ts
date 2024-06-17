import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '@shared/pipes/zod.pipe';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import { AddRecordDto, addRecordSchema } from '../dtos/record.dto';
import { RecordService } from '../services/record.service';

@ApiTags('records')
@Controller({ version: ApiVersion.V2, path: 'records' })
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @ApiBody({ type: AddRecordDto })
  @Put()
  @UseGuards(RoleGuard([Roles.student]))
  async addRecord(
    @Body(new ZodValidationPipe(addRecordSchema))
    createEntityDto,
  ) {
    try {
      return await this.recordService.add(createEntityDto);
    } catch (err) {
      console.error(err);
      throw new BadRequestException('Unable to complete request.');
    }
  }
}
