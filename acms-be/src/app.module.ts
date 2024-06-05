import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContestModule } from '@modules/contest/contest.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from '@modules/student/student.module';
import { AuthModule } from '@modules/auth/auth.module';
import { UserModule } from '@modules/user/user.module';
import config, { DatabaseConfig } from '@shared/config';
import { ImageKitModule } from '@modules/image-kit/image-kit.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
