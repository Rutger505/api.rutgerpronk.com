import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailDataDto } from "./dto/mail-data.dto";

@Injectable()
export class AppService {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  public async sendEmail(mailData: MailDataDto): Promise<boolean> {
    const info = await this.mailerService.sendMail({
      from: mailData.senderEmail,
      to: this.config.getOrThrow<string>("RECEIVER_EMAIL"),
      subject: `Website message from ${mailData.senderName}`,
      text: mailData.message,
    });
    return !!info.messageId;
  }
}
