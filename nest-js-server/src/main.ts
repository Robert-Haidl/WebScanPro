import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Serve static files from the "../src/dist" directory for your Angular app
  app.use(express.static(path.join(__dirname, '../../dist')));

  // Redirect all other requests to your Angular app's entry point
  app.use('index', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });

  await app.listen(3000);
}

bootstrap();