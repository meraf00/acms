import { Module } from '@nestjs/common';
import { ContestController } from './controllers/contest.controller';
import { ContestService } from './services/contest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contest, ContestSchema } from './entities/contest.entity';
import { ActiveContestController } from './controllers/active-contest.controller';
import { ContestDeletionRequestController } from './controllers/contest-deletion-request.controller';
import { ContestDeletionRequestService } from './services/contest-deletion.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contest.name, schema: ContestSchema }]),
  ],
  controllers: [
    ContestController,
    ActiveContestController,
    ContestDeletionRequestController,
  ],
  providers: [ContestService, ContestDeletionRequestService],
})
export class ContestModule {}
