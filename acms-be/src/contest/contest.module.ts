import { Module } from '@nestjs/common';
import { ContestController } from './controllers/contest.controller';
import { ContestService } from './services/contest.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contest, ContestSchema } from './entities/contest.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contest.name, schema: ContestSchema }]),
  ],
  controllers: [ContestController],
  providers: [ContestService],
})
export class ContestModule {}
