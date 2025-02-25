import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './clientes.service';
import { ClienteController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity/cliente.entity';
import { Telefone } from './entities/telefone.entity/telefone.entity';
import { Endereco } from './entities/endereco.entity/endereco.entity';
import { Empresa } from './entities/empresa.entity/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Telefone, Endereco, Empresa])],
  controllers: [ClienteController],
  providers: [ClienteService],
  exports: [ClienteService],
})
export class ClientesModule {}
