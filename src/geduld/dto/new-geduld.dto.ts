import { IsNumber, Max, Min } from "class-validator";

export class NewGeduldDto {
  @IsNumber()
  @Min(0)
  @Max(100)
  public readonly newGeduld: number;
}
