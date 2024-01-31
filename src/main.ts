import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import * as process from "process";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://rutgerpronk.com"
        : "http://localhost",
  });
  await app.listen(3222);
}

bootstrap();
