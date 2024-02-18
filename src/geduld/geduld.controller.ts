import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBody, ApiResponse } from "@nestjs/swagger";
import { Response } from "express";
import { NewGeduldDto } from "./dto/new-geduld.dto";
import { GeduldService } from "./geduld.service";

@Controller("geduld")
export class GeduldController {
  public constructor(private readonly geduldService: GeduldService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: "Geduld was updated",
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input (e.g. not a number, or not between 0 and 100)",
  })
  @ApiBody({
    description: "JSON with newGeduld field. a number in range 0-100",
    type: NewGeduldDto,
  })
  public setGeduld(@Body() body: NewGeduldDto): void {
    this.geduldService.setGeduld(body.newGeduld);
  }

  @Get()
  @ApiAcceptedResponse({
    status: 200,
    description:
      "JSON with the <code>geduld</code> field. A number in range 0-100",
  })
  public getGeduld(@Res() res: Response): void {
    res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      geduld: this.geduldService.getGeduld(),
    });
  }
}
