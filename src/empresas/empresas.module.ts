import { Module } from '@nestjs/common';
import { EmpresaService } from './empresas.service';
import { EmpresaController } from './empresas.controller';
import { Empresa } from './entities/empresa.entity/empresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente, Empresa])],
  providers: [EmpresaService],
  controllers: [EmpresaController],
  exports: [EmpresaService],
})
export class EmpresasModule {}
