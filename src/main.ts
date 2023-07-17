require("dotenv-safe").config();
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";
import { expressMiddleware } from "./middlewares/response.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(expressMiddleware());
  app.enableCors();
  setupSwagger(app);
  await app.listen(4000);
}
bootstrap();
