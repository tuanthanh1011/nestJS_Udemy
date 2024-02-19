import { Controller, Get, Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("mail")
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) { }

  @Get()
  @Public()
  @ResponseMessage("Send email success")
  // @Cron("0 0 0 * * 0") // 0.00 am every sunday
  @Cron(CronExpression.EVERY_5_MINUTES)
  handleAutoSendEmail() {
    return this.mailService.autoSendEmail();
  }
}
