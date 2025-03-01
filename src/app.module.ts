import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { TelefonesModule } from './telefones/telefones.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { EmpresasModule } from './empresas/empresas.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middleware/logger.middleware/logger.middleware.middleware';
import { SeedService } from './database/seeds/seed';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes/entities/cliente.entity/cliente.entity';
import { Telefone } from './telefones/entities/telefone.entity/telefone.entity';
import { Endereco } from './enderecos/entities/endereco.entity/endereco.entity';
import { Empresa } from './empresas/entities/empresa.entity/empresa.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ClientesModule,
    TelefonesModule,
    EnderecosModule,
    EmpresasModule,
    TypeOrmModule.forFeature([Cliente, Telefone, Endereco, Empresa]),
  ],
  providers: [SeedService],
  controllers: [AppController],
  exports: [SeedService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
