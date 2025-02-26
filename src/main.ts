import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('API de Clientes')
    .setDescription(
      'API para gerenciar clientes, telefones, endereços e empresas',
    )
    .setVersion('1.0')
    .addTag('clientes')
    .addTag('telefones')
    .addTag('enderecos')
    .addTag('empresas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;

  const networkInterfaces = os.networkInterfaces();
  let localIp = 'localhost';

  for (const interfaceName in networkInterfaces) {
    for (const net of networkInterfaces[interfaceName]!) {
      if (net.family === 'IPv4' && !net.internal) {
        localIp = net.address;
        break;
      }
    }
  }

  await app.listen(port);

  console.log(`\n🚀 Servidor rodando em:`);
  console.log(`   🖥️ Local:   http://localhost:${port}`);
  console.log(`   🌎 Externo: http://${localIp}:${port}`);
  console.log(`   📖 Swagger: http://${localIp}:${port}/api`);
}

bootstrap();
