import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MigrationDocument = HydratedDocument<Migration>;

@Schema()
export class Migration {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true })
  migrationNumber: number;
}

export const MigrationSchema = SchemaFactory.createForClass(Migration);
