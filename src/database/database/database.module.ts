import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cliente } from "src/clientes/entities/cliente.entity/cliente.entity";
import { Telefone } from "src/telefones/entities/telefone.entity/telefone.entity";
import { Endereco } from "src/enderecos/entities/endereco.entity/endereco.entity";
import { Empresa } from "src/empresas/entities/empresa.entity/empresa.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Cliente, Telefone, Endereco, Empresa],
        synchronize: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
