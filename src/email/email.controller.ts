import {
  Body,
  Controller,
  HttpStatus,
  Logger,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { EmailDataDto } from "./dto/email-data.dto";
import { EmailService } from "./email.service";

@Controller()
export class EmailController {
  private readonly logger = new Logger(EmailController.name);

  public constructor(private readonly emailService: EmailService) {}

  @Post("/email")
  public async sendEmail(@Body() mailData: EmailDataDto, @Res() res: Response) {
    this.logger.log(`Received request: ${JSON.stringify(mailData)}`);
    this.logger.log(`Sending email`);

    const succes = await this.emailService.sendEmail(mailData);

    if (succes) {
      this.logger.log(`Email sent successfully`);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Email sent successfully",
      });
    } else {
      this.logger.error(`Failed to send email`);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to send email",
      });
    }
  }
}
