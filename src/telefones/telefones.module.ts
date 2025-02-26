import { Module } from '@nestjs/common';
import { TelefoneService } from './telefones.service';
import { TelefoneController } from './telefones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Telefone } from './entities/telefone.entity/telefone.entity';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Telefone])],

  providers: [TelefoneService],
  controllers: [TelefoneController],
  exports: [TelefoneService],
})
export class TelefonesModule {}
