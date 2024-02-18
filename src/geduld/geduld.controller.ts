import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { NewGeduldDto } from "./dto/new-geduld.dto";
import { GeduldService } from "./geduld.service";

@Controller("geduld")
export class GeduldController {
  public constructor(private readonly geduldService: GeduldService) {}

  @Post()
  public setGeduld(@Body() body: NewGeduldDto): void {
    this.geduldService.setGeduld(body.newGeduld);
  }

  @Get()
  public getGeduld(@Res() res: Response): void {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      geduld: this.geduldService.getGeduld(),
    });
  }
}
