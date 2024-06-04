import { Controller } from '@nestjs/common';
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

const controllerOptions: EntityControllerOptions = {
  createSchema: createContestSchema,
  updateSchema: updateContestSchema,
  createDto: CreateContestDto,
  updateDto: UpdateContestDto,
};

@ApiTags('contests')
@Controller('contests')
export class ContestController extends EntityController<Contest>(
  controllerOptions,
) {
  constructor(private readonly contestService: ContestService) {
    super(contestService);
  }
}
