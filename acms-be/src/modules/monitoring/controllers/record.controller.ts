import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import { RecordingUploadedEvent, RecordUploaded } from '../events/record.event';
import { RecordService } from '../services/record.service';

@ApiTags('records')
@Controller({ version: ApiVersion.V2, path: 'records' })
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @OnEvent(RecordUploaded, { async: true })
  async handleFileUploaded(payload: RecordingUploadedEvent) {
    const { extra, fileId } = payload;
    await this.recordService.add(extra.contest, fileId, extra.user);
  }

  @UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
  @Get(':contest/students/:user')
  async getRecordedImages(
    @Param('contest') contest: string,
    @Param('user') user: string,
  ) {
    return this.recordService.getRecordImages(contest, user);
  }
}
