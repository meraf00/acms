import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { RecordService } from '@modules/monitoring/services/record.service';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityController } from '@shared/controllers/entity.controller';
import { EntityControllerOptions } from '@shared/types/controller-options';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import {
  CreateContestDto,
  createContestSchema,
  UpdateContestDto,
  updateContestSchema,
} from '../dtos/contest.dto';
import { Contest } from '../entities/contest.entity';
import { ContestService } from '../services/contest.service';

const controllerOptions: EntityControllerOptions = {
  createSchema: createContestSchema,
  updateSchema: updateContestSchema,
  createDto: CreateContestDto,
  updateDto: UpdateContestDto,
};

@ApiTags('contests')
@Controller({ version: ApiVersion.V2, path: 'contests' })
@UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
@UseGuards(JwtAuthGuard)
export class ContestController extends EntityController<Contest>(
  controllerOptions,
) {
  constructor(
    private readonly contestService: ContestService,
    private readonly recordService: RecordService,
  ) {
    super(contestService);
  }

  @Get(':id/records')
  async findWithRecordDetail(@Param('id') id: string) {
    try {
      return {
        contest: await this.entityService.findOne(id),
        record: await this.recordService.filterBy(id, null),
      };
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Unable to complete request.');
    }
  }
}
