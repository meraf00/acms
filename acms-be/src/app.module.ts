import { AuthModule } from '@modules/auth/auth.module';
import { ContestModule } from '@modules/contest/contest.module';
import { MonitoringModule } from '@modules/monitoring/monitoring.module';
import { StorageModule } from '@modules/storage/storage.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import config, { DatabaseConfig } from '@shared/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    EventEmitterModule.forRoot(),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<DatabaseConfig>('database')?.mongodbUri,
      }),
    }),
    UserModule,
    AuthModule,
    ContestModule,

    StorageModule,
    MonitoringModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
