import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';

import { ContestService } from '../services/contest.service';

@ApiTags('contests')
@Controller({ version: ApiVersion.V2, path: 'past-contests' })
@UseGuards(JwtAuthGuard)
export class PastContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.contestService.findOne(id);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Unable to complete request.');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.contestService.findAll(
        undefined, // isDeleted
        { startTime: -1 }, // sortBy
      );
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Unable to complete request.');
    }
  }
}
