import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './clientes.service';
import { ClienteController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity/cliente.entity';
import { Telefone } from './../telefones/entities/telefone.entity/telefone.entity';
import { Endereco } from './../enderecos/entities/endereco.entity/endereco.entity';
import { Empresa } from './../empresas/entities/empresa.entity/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Telefone, Endereco, Empresa])],

  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [ClienteService],
})
export class ClientesModule {}
