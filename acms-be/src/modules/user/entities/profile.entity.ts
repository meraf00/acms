import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ type: String, required: true })
  group: string;

  @Prop({ type: String, required: true })
  codeforcesHandle: string;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
