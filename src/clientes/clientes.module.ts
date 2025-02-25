import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';

@Module({
  providers: [ClientesService],
  controllers: [ClientesController]
})
export class ClientesModule {}
