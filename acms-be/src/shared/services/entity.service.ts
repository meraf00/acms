import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

export interface IEntityService<T> {
  create(data: any): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, data: any): Promise<any>;
  delete(id: string): Promise<any>;
}

export const EntityService = <T>(populateFields: string[] = []) => {
  @Injectable()
  class EntityServiceHost implements IEntityService<T> {
    constructor(readonly entityModel: Model<T>) {}

    async create(data: any): Promise<T> {
      return await this.entityModel.create(data);
    }

    async findAll(): Promise<T[]> {
      return await this.entityModel.find().populate(populateFields).exec();
    }

    async findOne(id: string): Promise<T> {
      return await this.entityModel
        .findOne({ id })
        .populate(populateFields)
        .exec();
    }

    async update(id: string, data: any) {
      return await this.entityModel.updateOne({ id }, data).exec();
    }

    async delete(id: string) {
      return await this.entityModel.deleteOne({ id }).exec();
    }
  }

  return EntityServiceHost;
};
