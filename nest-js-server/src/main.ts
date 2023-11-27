import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(express.static(path.join(__dirname, '../../dist')));

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  await app.listen(3000);
}

bootstrap();