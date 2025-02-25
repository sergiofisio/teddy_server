import { Empresa } from "src/empresas/entities/empresa.entity/empresa.entity";
import { Endereco } from "src/enderecos/entities/endereco.entity/endereco.entity";
import { Telefone } from "src/telefones/entities/telefone.entity/telefone.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  salario: number;

  @OneToMany(() => Telefone, (telefone) => telefone.cliente, { cascade: true })
  telefones: Telefone[];

  @OneToMany(() => Endereco, (endereco) => endereco.cliente, { cascade: true })
  enderecos: Endereco[];

  @OneToMany(() => Empresa, (empresa) => empresa.cliente, { cascade: true })
  empresas: Empresa[];
}
