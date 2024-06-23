import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '../../user/entities/user.entity';

export type ContestDocument = HydratedDocument<Contest>;

@Schema()
export class Contest {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  startingTime: Date;

  @Prop({ required: true })
  endingTime: Date;

  @Prop({ type: [Types.ObjectId], required: true, ref: User.name })
  students: User[];
}

export const ContestSchema = SchemaFactory.createForClass(Contest);
