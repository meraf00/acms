import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UploadedFileDocument = HydratedDocument<UploadedFile>;

@Schema()
export class UploadedFile {
  @Prop({ type: String, required: true })
  bucketName: string;

  @Prop({ type: String, required: true })
  objectName: string;

  @Prop({ type: String, required: true })
  contentType: string;

  @Prop({ type: String, required: true })
  originalName: string;
}

export const UploadedFileSchema = SchemaFactory.createForClass(UploadedFile);
