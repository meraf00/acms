import { AuthModule } from '@modules/auth/auth.module';
import { ContestModule } from '@modules/contest/contest.module';
import { ImageKitModule } from '@modules/image-kit/image-kit.module';
import { StudentModule } from '@modules/student/student.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config, { DatabaseConfig } from '@shared/config';
import { StorageModule } from '@shared/modules/storage/storage.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<DatabaseConfig>('database')?.mongodbUri,
      }),
    }),
    UserModule,
    AuthModule,
    ContestModule,
    StudentModule,
    ImageKitModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
