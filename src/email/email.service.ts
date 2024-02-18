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
    const receiverEmail = this.config.getOrThrow<string>("RECEIVER_EMAIL");
    const gmailUser = this.config.getOrThrow<string>("GMAIL_USER");
    let success: boolean;

    try {
      const result = await this.mailerService.sendMail({
        from: `Website <${gmailUser}>`,
        to: receiverEmail,
        replyTo: mailData.senderEmail,
        subject: `Message from ${mailData.senderName}`,
        html: `
          <p>${mailData.message}</p>
          <p>Reply to: ${mailData.senderEmail}</p>
        `,
      });

      success = !!result.messageId;
    } catch (error) {
      this.logger.error(`Failed to send email ${error}`, JSON.stringify(error));
      success = false;
    }

    return success;
  }
}
