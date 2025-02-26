import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { TelefonesModule } from './telefones/telefones.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { EmpresasModule } from './empresas/empresas.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middleware/logger.middleware/logger.middleware.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ClientesModule,
    TelefonesModule,
    EnderecosModule,
    EmpresasModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
