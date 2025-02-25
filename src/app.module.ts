import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './modules/clientes/clientes.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { Cliente } from './modules/clientes/entities/cliente.entity/cliente.entity';
import { Empresa } from './modules/clientes/entities/empresa.entity/empresa.entity';
import { Endereco } from './modules/clientes/entities/endereco.entity/endereco.entity';
import { Telefone } from './modules/clientes/entities/telefone.entity/telefone.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASS'),
        database: configService.get('DB_NAME'),
        entities: [Cliente, Empresa, Endereco, Telefone],
        synchronize: true,
        autoLoadEntities: true,
        extra:
          configService.get('DB_SSL') === 'true'
            ? { ssl: { rejectUnauthorized: false } }
            : {},
      }),
    }),
    ClientesModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
