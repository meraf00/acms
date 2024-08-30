import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import { CodeforcesService } from '../services/codeforces.service';

@ApiBearerAuth()
@ApiTags('codeforces')
@Controller({ version: ApiVersion.V2, path: 'codeforces' })
@UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
@UseGuards(JwtAuthGuard)
export class CodeforcesController {
  constructor(private readonly contestService: CodeforcesService) {}

  @Get('gyms')
  async getGyms() {
    return this.contestService.getContests();
  }

  @ApiParam({ name: 'id', type: String })
  @Get('gyms/:id')
  async getGym(@Param('id') id: string) {
    return this.contestService.getContest(id);
  }
}
