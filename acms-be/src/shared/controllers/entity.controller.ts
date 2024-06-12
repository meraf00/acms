import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { IEntityService } from '@shared/types/service';
import { DeleteResult } from 'mongodb';
import { UpdateWriteOpResult } from 'mongoose';

import { ZodValidationPipe } from '../pipes/zod.pipe';
import { EntityControllerOptions } from '../types/controller-options';

export const EntityController = <T>(
  controllerOptions: EntityControllerOptions,
) => {
  @Controller()
  @ApiBearerAuth()
  class EntityController {
    constructor(readonly entityService: IEntityService<T>) {}

    @ApiBody({ type: controllerOptions.createDto })
    @Post()
    async create(
      @Body(new ZodValidationPipe(controllerOptions.createSchema))
      createEntityDto,
    ) {
      try {
        return await this.entityService.create(createEntityDto);
      } catch (err) {
        console.error(err);
        throw new BadRequestException('Unable to complete request.');
      }
    }

    @Get()
    findAll() {
      return this.entityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.entityService.findOne(id);
    }

    @ApiBody({ type: controllerOptions.updateDto })
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body(new ZodValidationPipe(controllerOptions.updateSchema))
      updateEntityDto,
    ) {
      let result: UpdateWriteOpResult;
      try {
        result = await this.entityService.update(id, updateEntityDto);
      } catch (err) {
        console.error(err);
        throw new BadRequestException('Unable to complete request.');
      }
      if (result.modifiedCount === 0) {
        throw new NotFoundException('not_found');
      }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
      let result: DeleteResult;
      try {
        result = await this.entityService.delete(id);
      } catch (err) {
        console.error(err);
        throw new BadRequestException('Unable to complete request.');
      }
      if (result.deletedCount === 0) {
        throw new NotFoundException('not_found');
      }
    }
  }

  return EntityController;
};
