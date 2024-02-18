import { Module } from "@nestjs/common";
import { GeduldController } from "./geduld.controller";
import { GeduldService } from "./geduld.service";

@Module({
  controllers: [GeduldController],
  providers: [GeduldService],
})
export class GeduldModule {}
