import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { GeduldModule } from "./geduld/geduld.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("api.rutgerpronk.com")
    .setDescription(
      "API used in my portfolio: <a href='https://rutgerpronk.com' target='_blank'>https://rutgerpronk.com</a>. <br>",
    )
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [GeduldModule],
  });
  SwaggerModule.setup("docs", app, document);

  if (new Date() > new Date(2024, 1, 26)) {
    console.warn(
      "All origins are still allowed due to school escape room project. Change to rutgerpronk.com",
    );
  }
  app.enableCors({
    origin: "*",
    // origin:
    //   process.env.NODE_ENV === "production"
    //     ? "https://rutgerpronk.com"
    //     : "http://localhost",
  });
  await app.listen(3222);
}

bootstrap();
