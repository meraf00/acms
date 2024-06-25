import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { HttpService } from '@nestjs/axios';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { TelegramConfig } from '@shared/config';
import { ApiVersion } from '@shared/types/version';
import { map } from 'rxjs';

import { ReportIssueDto } from '../dtos/issue.dto';

@ApiTags('issues')
@Controller({ version: ApiVersion.V2, path: 'issues' })
@UseGuards(JwtAuthGuard)
export class IssueController {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  create(@Body() dto: ReportIssueDto, @Req() req: any) {
    const telegram = this.configService.get<TelegramConfig>('telegram')!;
    const message = `From: ${req.user.name} ${req.user.email}
Category: ${dto.type}
    
${dto.message}`.replaceAll('\n', '%0A');

    return this.httpService
      .get(
        `https://api.telegram.org/bot${telegram.bot_token}/sendMessage?chat_id=${telegram.receiver_chat_id}&text=${message}`,
      )
      .pipe(map((response) => response.data));
  }
}
