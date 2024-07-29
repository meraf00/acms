import { User } from '@modules/user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { Contest } from './contest.entity';

export type ContestDeletionRequestDocument =
  HydratedDocument<ContestDeletionRequest>;

@Schema()
export class ContestDeletionRequest {
  @Prop({ type: Types.ObjectId, required: true, ref: Contest.name })
  contest: Contest;

  @Prop({ type: [Types.ObjectId], required: true, ref: User.name, default: [] })
  approvals: User[];

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;
}

export const ContestDeletionRequestSchema = SchemaFactory.createForClass(
  ContestDeletionRequest,
);
