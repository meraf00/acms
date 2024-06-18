import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Roles } from '@shared/types/roles';
import { HydratedDocument, Types } from 'mongoose';

import { Profile } from './profile.entity';

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

  @Prop({ type: Types.ObjectId, ref: Profile.name })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
