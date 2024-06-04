import { Controller } from '@nestjs/common';
import { ContestService } from '../services/contest.service';
import { CreateContestDto, UpdateContestDto } from '../dtos/contest.dto';

import {
  EntityController,
  EntityControllerOptions,
} from 'src/shared/controllers/entity.controller';
import { Contest } from '../entities/contest.entity';
import { ApiTags } from '@nestjs/swagger';

const controllerOptions: EntityControllerOptions = {
  entityService: ContestService,
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
