import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RecordService } from '@modules/monitoring/services/record.service';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiVersion } from '@shared/types/version';

// import {
//   CreateContestDto,
//   createContestSchema,
//   UpdateContestDto,
//   updateContestSchema,
// } from '../dtos/contest.dto';
// import { Contest } from '../entities/contest.entity';
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
      return await this.contestService.findAll();
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Unable to complete request.');
    }
  }
}
