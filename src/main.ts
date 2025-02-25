import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('TEDDY API')
    .setDescription('API para gerenciamento de clientes')
    .setVersion('1.0')
    .addTag('clientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  const networkInterfaces = os.networkInterfaces();
  let localIp = 'localhost';

  for (const interfaceKey in networkInterfaces) {
    const netInterface = networkInterfaces[interfaceKey];
    if (netInterface) {
      for (const net of netInterface) {
        if (net.family === 'IPv4' && !net.internal) {
          localIp = net.address;
          break;
        }
      }
    }
  }

  console.log(`🚀 Servidor rodando em:`);
  console.log(`   🔗 Local: http://localhost:${port}/`);
  console.log(`   🌍 Rede:  http://${localIp}:${port}/`);
  console.log(`📄 Swagger disponível em:`);
  console.log(`   🔗 Local: http://localhost:${port}/api`);
  console.log(`   🌍 Rede:  http://${localIp}:${port}/api`);
}
bootstrap();
