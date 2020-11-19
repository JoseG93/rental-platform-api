import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  
  // await app.listen(environment.get('HTTP_SERVER_PORT'));
  await app.listen(3000);
}
bootstrap();
