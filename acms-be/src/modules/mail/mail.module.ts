import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailConfig } from '@shared/config';
import { join } from 'path';

import { MailService } from './services/mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const emailConfig = configService.get<EmailConfig>('email')!;

        return {
          transport: {
            host: emailConfig.host,
            secure: true,
            port: emailConfig.port,
            auth: {
              type: 'oauth2',
              user: emailConfig.user,
              clientId: emailConfig.clientId,
              clientSecret: emailConfig.clientSecret,
              refreshToken: emailConfig.refreshToken,
              accessToken: emailConfig.accessToken,
            },
          },

          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
