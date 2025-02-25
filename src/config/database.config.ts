import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Cliente } from './../modules/clientes/entities/cliente.entity/cliente.entity';
import { Telefone } from './../modules/clientes/entities/telefone.entity/telefone.entity';
import { Endereco } from './../modules/clientes/entities/endereco.entity/endereco.entity';

dotenv.config();

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_NAME,
  ssl: process.env.DB_SSL,
});

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  extra: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  entities: [Cliente, Telefone, Endereco],
  synchronize: true,
  autoLoadEntities: true,
};
