import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IEntityService } from '../services/entity.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

export interface EntityControllerOptions {
  entityService: any;
  createDto: any;
  updateDto: any;
}

export const EntityController = <T>(
  controllerOptions: EntityControllerOptions,
) => {
  @Controller()
  @ApiBearerAuth()
  class EntityController {
    constructor(readonly entityService: IEntityService<T>) {}

    @ApiBody({ type: controllerOptions.createDto })
    @Post()
    async create(@Body() createEntityDto: typeof controllerOptions.createDto) {
      try {
        return await this.entityService.create(createEntityDto);
      } catch (err) {
        console.error(err);
        throw new BadRequestException('Unable to complete request.');
      }
    }

    @UseGuards(JwtAuthGuard)
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
      @Body() updateEntityDto: typeof controllerOptions.updateDto,
    ) {
      try {
        return this.entityService.update(id, updateEntityDto);
      } catch (err) {
        console.error(err);
        throw new BadRequestException('Unable to complete request.');
      }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
      try {
        return await this.entityService.delete(id);
      } catch (err) {
        console.error(err);
        throw new BadRequestException('Unable to complete request.');
      }
    }
  }

  return EntityController;
};
