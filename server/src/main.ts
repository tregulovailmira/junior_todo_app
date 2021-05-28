import 'reflect-metadata';
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  await app.listen(5000);
}

bootstrap();
