import { ZodType, ZodTypeDef } from 'zod';

export interface EntityControllerOptions {
  createDto: { new (): NonNullable<unknown> };
  updateDto: { new (): NonNullable<unknown> };
  createSchema: ZodType<any, ZodTypeDef, any>;
  updateSchema: ZodType<any, ZodTypeDef, any>;
}
