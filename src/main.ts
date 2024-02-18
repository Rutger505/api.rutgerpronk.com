import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (new Date() > new Date(2024, 1, 26)) {
    console.warn(
      "All origins are still allowed due to school escape room project. Change to rutgerpronk.com",
    );
  }
  app.enableCors({
    origin: "*",
  });
  // app.enableCors({
  //   origin:
  //     process.env.NODE_ENV === "production"
  //       ? "https://rutgerpronk.com"
  //       : "http://localhost",
  // });
  await app.listen(3222);
}

bootstrap();
