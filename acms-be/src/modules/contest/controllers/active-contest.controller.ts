import { Controller, Get, UseGuards } from '@nestjs/common';
import { ContestService } from '../services/contest.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '@shared/types/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('contests')
@ApiBearerAuth()
@Controller('active-contests')
@UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe, Roles.student]))
@UseGuards(JwtAuthGuard)
export class ActiveContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get()
  async getActiveContests() {
    return await this.contestService.getActiveContests();
  }
}
