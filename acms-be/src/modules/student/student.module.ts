import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentController } from './controllers/student.controller';
import { Student, StudentSchema } from './entities/student.entity';
import { StudentService } from './services/student.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
