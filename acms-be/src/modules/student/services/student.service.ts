import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../entities/student.entity';
import { EntityService } from '@shared/services/entity.service';

@Injectable()
export class StudentService extends EntityService<Student>([]) {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
  ) {
    super(studentModel);
  }
}
