import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
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
}
