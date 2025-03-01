import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed';
import { AppModule } from './../../app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);
  await seedService.runSeed();
  await app.close();
}

bootstrap();
