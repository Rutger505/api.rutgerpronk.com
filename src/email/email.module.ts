import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailController } from "./email.controller";
import { EmailService } from "./email.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: configService.getOrThrow<string>("GMAIL_USER"),
            pass: configService.getOrThrow<string>("GMAIL_APP_PASSWORD"),
          },
        },
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
