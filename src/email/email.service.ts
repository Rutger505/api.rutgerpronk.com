import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EmailDataDto } from "./dto/email-data.dto";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  public constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  public async sendEmail(mailData: EmailDataDto): Promise<boolean> {
    let success: boolean;

    try {
      const result = await this.mailerService.sendMail({
        from: mailData.senderEmail,
        to: this.config.getOrThrow<string>("RECEIVER_EMAIL"),
        subject: `Website message from ${mailData.senderName}`,
        text: mailData.message,
      });

      success = !!result.messageId;
    } catch (error) {
      this.logger.error(`Failed to send email ${error}`, JSON.stringify(error));
      success = false;
    }

    return success;
  }
}
