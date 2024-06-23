import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

import { CodeforcesService } from '../services/codeforces.service';

@Controller()
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
