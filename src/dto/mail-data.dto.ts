import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class MailDataDto {
  @IsNotEmpty()
  @IsString()
  public readonly senderName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public readonly senderEmail: string;

  @IsNotEmpty()
  @IsString()
  public readonly message: string;
}
