import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class NewGeduldDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  @ApiProperty({
    description: "The new value of geduld",
    minimum: 0,
    maximum: 100,
  })
  public readonly newGeduld: number;
}
