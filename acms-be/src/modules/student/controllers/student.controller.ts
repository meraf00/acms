import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
import { Controller, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntityController } from '@shared/controllers/entity.controller';
import { EntityControllerOptions } from '@shared/types/controller-options';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import {
  CreateStudentDto,
  createStudentSchema,
  UpdateStudentDto,
  updateStudentSchema,
} from '../dtos/student.dto';
import { Student } from '../entities/student.entity';
import { StudentService } from '../services/student.service';

const controllerOptions: EntityControllerOptions = {
  createSchema: createStudentSchema,
  updateSchema: updateStudentSchema,
  createDto: CreateStudentDto,
  updateDto: UpdateStudentDto,
};

@ApiTags('students')
@Controller({ version: ApiVersion.V2, path: 'students' })
@UseGuards(RoleGuard([Roles.hoa, Roles.hoe, Roles.acms]))
@UseGuards(JwtAuthGuard)
export class StudentController extends EntityController<Student>(
  controllerOptions,
) {
  constructor(private readonly studentService: StudentService) {
    super(studentService);
  }
}
