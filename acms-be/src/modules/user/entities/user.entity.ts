import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '@shared/types/roles';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  picture: string;

  @Prop({ type: String, required: true, default: [Roles.student] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
