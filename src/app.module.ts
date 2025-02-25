import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database/database.module';
import { ClientesModule } from './clientes/clientes.module';
import { TelefonesModule } from './telefones/telefones.module';
import { EnderecosModule } from './enderecos/enderecos.module';
import { EmpresasModule } from './empresas/empresas.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    ClientesModule,
    TelefonesModule,
    EnderecosModule,
    EmpresasModule,
  ],
})
export class AppModule {}
