import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmailToken(email: string, context: Record<string, any>) {
    await this.mailerService.sendMail({
      to: email,
      from: '"ACMS" <acms@a2sv.org>',
      subject: 'Welcome to A2SV Contest Monitoring!',
      template: '../templates/login-email',
      context,
    });
  }
}
