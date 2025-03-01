import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Telefone } from './../../../telefones/entities/telefone.entity/telefone.entity';
import { Endereco } from './../../../enderecos/entities/endereco.entity/endereco.entity';
import { Empresa } from './../../../empresas/entities/empresa.entity/empresa.entity';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  salario: number;

  @OneToMany(() => Telefone, (telefone) => telefone.cliente, { cascade: true })
  telefones: Telefone[];

  @OneToMany(() => Endereco, (endereco) => endereco.cliente, { cascade: true })
  enderecos: Endereco[];

  @OneToMany(() => Empresa, (empresa) => empresa.cliente, { cascade: true })
  empresas: Empresa[];
}
