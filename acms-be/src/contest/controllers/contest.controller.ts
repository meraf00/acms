import { Controller, UseGuards } from '@nestjs/common';
import { ContestService } from '../services/contest.service';
import {
  CreateContestDto,
  UpdateContestDto,
  createContestSchema,
  updateContestSchema,
} from '../dtos/contest.dto';

import { EntityController } from 'src/shared/controllers/entity.controller';
import { Contest } from '../entities/contest.entity';
import { ApiTags } from '@nestjs/swagger';
import { EntityControllerOptions } from '@shared/types/controller-options';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from '@shared/types/roles';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

const controllerOptions: EntityControllerOptions = {
  createSchema: createContestSchema,
  updateSchema: updateContestSchema,
  createDto: CreateContestDto,
  updateDto: UpdateContestDto,
};

@ApiTags('contests')
@Controller('contests')
@UseGuards(RoleGuard([Roles.hoa, Roles.hoe, Roles.acms]))
@UseGuards(JwtAuthGuard)
export class ContestController extends EntityController<Contest>(
  controllerOptions,
) {
  constructor(private readonly contestService: ContestService) {
    super(contestService);
  }
}
