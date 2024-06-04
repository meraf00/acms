import { Controller } from '@nestjs/common';
import { StudentService } from '../services/student.service';

import { ApiTags } from '@nestjs/swagger';
import { EntityController } from 'src/shared/controllers/entity.controller';
import {
  CreateStudentDto,
  UpdateStudentDto,
  createStudentSchema,
  updateStudentSchema,
} from '../dtos/student.dto';
import { Student } from '../entities/student.entity';
import { EntityControllerOptions } from '@shared/types/controller-options';

const controllerOptions: EntityControllerOptions = {
  createSchema: createStudentSchema,
  updateSchema: updateStudentSchema,
  createDto: CreateStudentDto,
  updateDto: UpdateStudentDto,
};

@ApiTags('students')
@Controller('students')
export class StudentController extends EntityController<Student>(
  controllerOptions,
) {
  constructor(private readonly studentService: StudentService) {
    super(studentService);
  }
}
