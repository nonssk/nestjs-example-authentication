import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
export const setupSwagger = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle("API example")
    .setDescription("GARAM API description")
    .setVersion("1.0")
    .addTag("users")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
};
