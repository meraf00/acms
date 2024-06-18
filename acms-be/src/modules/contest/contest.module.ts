import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActiveContestController } from './controllers/active-contest.controller';
import { ContestController } from './controllers/contest.controller';
import { ContestDeletionRequestController } from './controllers/contest-deletion-request.controller';
import { Contest, ContestSchema } from './entities/contest.entity';
import {
  ContestDeletionRequest,
  ContestDeletionRequestSchema,
} from './entities/contest-deletion-request.entity';
import { ContestService } from './services/contest.service';
import { ContestDeletionRequestService } from './services/contest-deletion.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Contest.name, schema: ContestSchema },
      {
        name: ContestDeletionRequest.name,
        schema: ContestDeletionRequestSchema,
      },
    ]),
  ],
  controllers: [
    ContestController,
    ActiveContestController,
    ContestDeletionRequestController,
  ],
  providers: [ContestService, ContestDeletionRequestService],
  exports: [ContestService],
})
export class ContestModule {}
