import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { EntityService } from '@shared/services/entity.service';
import { ContestDeletionRequest } from '../entities/contest-deletion-request.entity';

@Injectable()
export class ContestDeletionRequestService extends EntityService<ContestDeletionRequest>(
  ['contest'],
) {
  constructor(
    @InjectModel(ContestDeletionRequest.name)
    private readonly contestDeletionRequestModel: Model<ContestDeletionRequest>,
  ) {
    super(contestDeletionRequestModel);
  }

  async createDeletionRequest(
    contestId: string,
    userId: string,
  ): Promise<ContestDeletionRequest> {
    return this.create({
      contest: contestId,
      approvals: [userId],
    });
  }

  async updateApproval(
    deletionRequestId: string,
    approve: boolean,
    userId: string,
  ): Promise<ContestDeletionRequest | null> {
    let result: UpdateWriteOpResult;

    if (approve) {
      result = await this.update(deletionRequestId, {
        $addToSet: { approvals: userId },
      });
    } else {
      result = await this.update(deletionRequestId, {
        $pull: { approvals: userId },
      });
    }

    if (result.matchedCount === 0) throw new NotFoundException('not_found');

    return await this.findOne(deletionRequestId);
  }
}
