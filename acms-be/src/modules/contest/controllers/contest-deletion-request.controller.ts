import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RoleGuard } from '@modules/auth/guards/role.guard';
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@shared/types/roles';
import { ApiVersion } from '@shared/types/version';

import {
  CreateContestDeletionRequestDto,
  UpdateContestDeletionApprovalDto,
} from '../dtos/contest-deletion-request.dto';
import { ContestDeletionRequestService } from '../services/contest-deletion.service';
import { DeleteResult } from 'mongodb';

@ApiTags('contest-deletion-requests')
@ApiBearerAuth()
@Controller({ version: ApiVersion.V2, path: 'contest-deletion-requests' })
@UseGuards(RoleGuard([Roles.acms, Roles.hoa, Roles.hoe]))
@UseGuards(JwtAuthGuard)
export class ContestDeletionRequestController {
  constructor(
    readonly contestDeletionRequestService: ContestDeletionRequestService,
  ) {}

  @Post()
  async createContestDeletionRequest(
    @Body() body: CreateContestDeletionRequestDto,
    @Req() req: any,
  ) {
    return this.contestDeletionRequestService.createDeletionRequest(
      body.contest,
      req.user.id,
    );
  }

  @Put(':id')
  async approveContestDeletionRequest(
    @Param('id') id: string,
    @Body() body: UpdateContestDeletionApprovalDto,
    @Req() req: any,
  ) {
    return this.contestDeletionRequestService.updateApproval(
      'id',
      body.approve,
      req.user.id,
    );
  }

  @Get()
  async getContestDeletionRequests() {
    return this.contestDeletionRequestService.findAll();
  }

  @Get(':id')
  async getContestDeletionRequest(@Param('id') id: string) {
    const cdr = await this.contestDeletionRequestService.findOne(id);
    if (!cdr) {
      throw new NotFoundException('not_found');
    }
    return cdr;
  }

  @Delete(':id')
  async deleteContestDeletionRequest(@Param('id') id: string) {
    let result: DeleteResult;
    try {
      result = await this.contestDeletionRequestService.delete(id);
    } catch (err) {
      throw new BadRequestException('Unable to complete request.');
    }
    if (result.deletedCount === 0) {
      throw new NotFoundException('not_found');
    }
  }
}
