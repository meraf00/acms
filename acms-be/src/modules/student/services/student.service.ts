import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityService } from '@shared/services/entity.service';
import { Model } from 'mongoose';

import { Student } from '../entities/student.entity';

@Injectable()
export class StudentService extends EntityService<Student>([]) {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {
    super(studentModel);
  }
}
