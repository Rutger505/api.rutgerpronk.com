import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Post,
  Res,
} from "@nestjs/common";
import { Response } from "express";
import { AppService } from "./app.service";
import { MailDataDto } from "./dto/mail-data.dto";

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  public constructor(private readonly appService: AppService) {}

  @Post("/email")
  public async sendEmail(@Body() mailData: MailDataDto, @Res() res: Response) {
    this.logger.log(`Received request: ${JSON.stringify(mailData)}`);
    this.logger.log(`Sending email to ${mailData.senderEmail}...`);

    try {
      const success = await this.appService.sendEmail(mailData);

      if (!success) {
        throw new InternalServerErrorException("Failed to send email");
      }

      this.logger.log(`Email sent to ${mailData.senderEmail}`);
      res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Email sent successfully",
      });
    } catch (error) {
      this.logger.error(`Failed to send email ${error}`, JSON.stringify(error));

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Failed to send email",
      });
    }
  }
}
