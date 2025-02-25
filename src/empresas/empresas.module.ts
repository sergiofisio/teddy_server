import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';

@Module({
  providers: [EmpresasService],
  controllers: [EmpresasController]
})
export class EmpresasModule {}
