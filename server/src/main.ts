import "reflect-metadata";
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { connect } from './typeorm';

async function bootstrap() {
  await connect();
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
