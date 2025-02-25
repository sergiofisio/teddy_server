import { Module } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { EnderecosController } from './enderecos.controller';

@Module({
  providers: [EnderecosService],
  controllers: [EnderecosController]
})
export class EnderecosModule {}
