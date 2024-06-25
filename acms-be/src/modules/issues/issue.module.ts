import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { IssueController } from './controllers/issue.controller';

@Module({
  imports: [HttpModule],
  controllers: [IssueController],
})
export class IssueModule {}
