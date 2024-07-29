import { Injectable } from '@nestjs/common';
import { IEntityService } from '@shared/types/service';
import { PathDef } from '@shared/types/service-option';
import { Model } from 'mongoose';

export const EntityService = <T>(populateFields: string[] | PathDef = []) => {
  @Injectable()
  class EntityServiceHost implements IEntityService<T> {
    constructor(readonly entityModel: Model<T>) {}

    async create(data: any): Promise<T> {
      return await this.entityModel.create(data);
    }

    async findAll(): Promise<T[]> {
      try {
        return await this.entityModel
          .find({ isDeleted: false })
          .populate(populateFields)
          .exec();
      } catch (e) {
        console.log(e);
      }
      return [];
    }

    async findOne(id: string): Promise<T | null> {
      try {
        return await this.entityModel
          .findOne({ _id: id, isDeleted: false })
          .populate(populateFields)
          .exec();
      } catch (e) {
        console.log(e);
      }
      return null;
    }

    async update(id: string, data: any) {
      return await this.entityModel
        .updateOne({ _id: id, isDeleted: false }, data)
        .exec();
    }

    async delete(id: string) {
      return await this.entityModel
        .updateOne({ _id: id }, { isDeleted: true })
        .exec();
    }
  }

  return EntityServiceHost;
};
