import { Module } from '@nestjs/common';
import { EnderecoService } from './enderecos.service';
import { EnderecoController } from './enderecos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Endereco } from './entities/endereco.entity/endereco.entity';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Endereco])],

  providers: [EnderecoService],
  controllers: [EnderecoController],
  exports: [EnderecoService],
})
export class EnderecosModule {}
