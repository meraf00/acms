import { UserModule } from '@modules/user/user.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActiveContestController } from './controllers/active-contest.controller';
import { CodeforcesController } from './controllers/codeforces.controller';
import { ContestController } from './controllers/contest.controller';
import { ContestDeletionRequestController } from './controllers/contest-deletion-request.controller';
import { PastContestController } from './controllers/past-contests.controller';
import { UpcomingContestController } from './controllers/upcoming-contest.controller';
import { Contest, ContestSchema } from './entities/contest.entity';
import {
  ContestDeletionRequest,
  ContestDeletionRequestSchema,
} from './entities/contest-deletion-request.entity';
import { CodeforcesService } from './services/codeforces.service';
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
    HttpModule,
    UserModule,
  ],
  controllers: [
    PastContestController,
    UpcomingContestController,
    CodeforcesController,
    ContestController,
    ActiveContestController,
    ContestDeletionRequestController,
  ],
  providers: [CodeforcesService, ContestService, ContestDeletionRequestService],
  exports: [ContestService],
})
export class ContestModule {}
