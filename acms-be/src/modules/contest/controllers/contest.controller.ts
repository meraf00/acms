import { Controller, UseGuards } from '@nestjs/common';
import { ContestService } from '../services/contest.service';
import {
  CreateContestDto,
  UpdateContestDto,
  createContestSchema,
  updateContestSchema,
} from '../dtos/contest.dto';

import { EntityController } from '@shared/controllers/entity.controller';
import { Contest } from '../entities/contest.entity';
import { ApiTags } from '@nestjs/swagger';
import { EntityControllerOptions } from '@shared/types/controller-options';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Roles } from '@shared/types/roles';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

const controllerOptions: EntityControllerOptions = {
  createSchema: createContestSchema,
  updateSchema: updateContestSchema,
  createDto: CreateContestDto,
  updateDto: UpdateContestDto,
};

@ApiTags('contests')
@Controller('contests')
@UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
@UseGuards(JwtAuthGuard)
export class ContestController extends EntityController<Contest>(
  controllerOptions,
) {
  constructor(private readonly contestService: ContestService) {
    super(contestService);
  }
}
