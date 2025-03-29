/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ConsoleLogger, Logger } from '@nestjs/common';
import supertokens from 'supertokens-node';
import { SuperTokensExceptionFilter } from 'supertokens-nestjs';

async function bootstrap() {
  const nodeEnv = process.env.NODE_ENV;
  Logger.overrideLogger(new ConsoleLogger({
    json: nodeEnv === 'production',
    timestamp: true
  }));
  Logger.log(`Starting application with app env ${process.env.APP_ENV} and node env ${nodeEnv}`);

  const app = await NestFactory.create(
    AppModule);

  app.enableCors({
    origin: ['http://localhost:4200'],
    allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
  app.useGlobalFilters(new SuperTokensExceptionFilter())

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
