import { Contest } from '@modules/contest/entities/contest.entity';
import { UploadedFile } from '@modules/storage/entities/file.entity';
import { User } from '@modules/user/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RecordDocument = HydratedDocument<Record>;

@Schema()
export class Record {
  @Prop({ type: Types.ObjectId, required: true, ref: Contest.name })
  contest: Contest;

  @Prop({ type: Types.ObjectId, required: true, ref: User.name })
  user: User;

  @Prop({
    type: [Types.ObjectId],
    required: true,
    ref: UploadedFile.name,
    default: [],
  })
  files: UploadedFile[];
}

export const RecordSchema = SchemaFactory.createForClass(Record);
