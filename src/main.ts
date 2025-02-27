import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

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
  const externalUrl =
    process.env.RENDER_EXTERNAL_URL || getLocalNetworkAddress(Number(port));

  await app.listen(port, '0.0.0.0');

  console.log(`\n🚀 Servidor rodando em:`);
  console.log(`   🖥️ Local:   http://localhost:${port}`);
  console.log(`   🖥️ Swagger Local:   http://localhost:${port}/api`);
  console.log(`   🌎 Externo: ${externalUrl}`);
  console.log(`   📖 Swagger externo: ${externalUrl}/api`);
}

function getLocalNetworkAddress(port: number): string {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    for (const net of networkInterfaces[interfaceName]!) {
      if (net.family === 'IPv4' && !net.internal) {
        return `http://${net.address}:${port}`;
      }
    }
  }
  return `http://localhost:${port}`;
}

bootstrap();
