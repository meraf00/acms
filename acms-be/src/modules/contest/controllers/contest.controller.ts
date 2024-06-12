import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, UseGuards } from '@nestjs/common';
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
  constructor(private readonly contestService: ContestService) {
    super(contestService);
  }
}
