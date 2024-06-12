import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import { ContestService } from '../services/contest.service';

@ApiTags('contests')
@ApiBearerAuth()
@Controller({ version: ApiVersion.V2, path: 'active-contests' })
@UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe, Roles.student]))
@UseGuards(JwtAuthGuard)
export class ActiveContestController {
  constructor(private readonly contestService: ContestService) {}

  @Get()
  async getActiveContests() {
    return await this.contestService.getActiveContests();
  }
}
