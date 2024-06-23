import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityController } from '@shared/controllers/entity.controller';
import { EntityControllerOptions } from '@shared/types/controller-options';
import { ApiVersion } from '@shared/types/version';

import {
  CreateProfileDto,
  createProfileSchema,
  UpdateProfileDto,
  updateProfileSchema,
} from '../dtos/profile.dto';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';

const controllerOptions: EntityControllerOptions = {
  createSchema: createProfileSchema,
  updateSchema: updateProfileSchema,
  createDto: CreateProfileDto,
  updateDto: UpdateProfileDto,
};

@ApiTags('profiles')
@Controller({ version: ApiVersion.V2, path: 'profiles' })
@UseGuards(JwtAuthGuard)
export class ProfileController extends EntityController<Profile>(
  controllerOptions,
) {
  constructor(private readonly profileService: ProfileService) {
    super(profileService);
  }
}
