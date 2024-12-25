import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlerware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const loggerMiddlerware = new LoggerMiddleware();

  app.use(loggerMiddlerware.use);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
