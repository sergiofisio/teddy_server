import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm';
import { Telefone } from '../telefone.entity/telefone.entity';
import { Endereco } from '../endereco.entity/endereco.entity';
import { Empresa } from '../empresa.entity/empresa.entity';

@Entity('clientes')
@Unique(['email'])
@Unique(['cpf'])
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salario: number;

  @OneToMany(() => Telefone, (telefone) => telefone.cliente, {
    cascade: ['insert', 'update', 'remove'],
  })
  telefones: Telefone[];

  @OneToMany(() => Endereco, (endereco) => endereco.cliente, {
    cascade: ['insert', 'update', 'remove'],
  })
  enderecos: Endereco[];

  @OneToMany(() => Empresa, (empresa) => empresa.cliente, { cascade: true })
  empresas: Empresa[];
}
