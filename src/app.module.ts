import { Module } from "@nestjs/common";
import { EmailModule } from "./email/email.module";
import { GeduldModule } from "./geduld/geduld.module";

@Module({
  imports: [EmailModule, GeduldModule],
})
export class AppModule {}
