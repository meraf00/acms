import { User } from '@modules/user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student {
  @Prop({ type: String, required: true })
  group: string;

  @Prop({ type: String, required: true })
  codeforcesHandle: string;

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  profile: User;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
