import { Body, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { IEntityService } from '../services/entity.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export interface EntityControllerOptions {
  entityService: any;
  createDto: any;
  updateDto: any;
}

export const EntityController = <T>(
  controllerOptions: EntityControllerOptions,
) => {
  class EntityController {
    constructor(readonly entityService: IEntityService<T>) {}

    @ApiBearerAuth()
    @Post()
    create(@Body() createEntityDto: typeof controllerOptions.createDto) {
      return this.entityService.create(createEntityDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.entityService.findAll();
    }

    @ApiBearerAuth()
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.entityService.findOne(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    update(
      @Param('id') id: string,
      @Body() updateEntityDto: typeof controllerOptions.updateDto,
    ) {
      return this.entityService.update(id, updateEntityDto);
    }

    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.entityService.delete(id);
    }
  }

  return EntityController;
};
