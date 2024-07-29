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

    async findAll(isDeleted: boolean = false): Promise<T[]> {
      try {
        return await this.entityModel
          .find({ isDeleted })
          .populate(populateFields)
          .exec();
      } catch (e) {
        console.log(e);
      }
      return [];
    }

    async findOne(id: string, isDeleted: boolean = false): Promise<T | null> {
      try {
        return await this.entityModel
          .findOne({ _id: id, isDeleted })
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
        .updateOne({ _id: id, isDeleted: false }, { isDeleted: true })
        .exec();
    }
  }

  return EntityServiceHost;
};
