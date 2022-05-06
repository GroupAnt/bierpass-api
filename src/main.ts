import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const options = { bufferLogs: true };

  const app = await NestFactory.create(AppModule, options);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
