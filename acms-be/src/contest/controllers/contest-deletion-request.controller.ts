import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContestDeletionRequestService } from '../services/contest-deletion.service';
import {
  CreateContestDeletionRequestDto,
  UpdateContestDeletionApprovalDto,
} from '../dtos/contest-deletion-request.dto';

@ApiTags('contest-deletion-requests')
@Controller('contest-deletion-requests')
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
    return this.contestDeletionRequestService.findOne(id);
  }

  @Delete(':id')
  async deleteContestDeletionRequest(@Param('id') id: string) {
    return this.contestDeletionRequestService.delete(id);
  }
}
