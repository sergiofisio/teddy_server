import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { typeOrmConfig } from './config/database.config';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ClientesModule],
  controllers: [AppController], // Adicionando a rota /
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
