import 'reflect-metadata';
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { connect } from './typeorm';

async function bootstrap() {
  await connect();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000);
}
bootstrap();
