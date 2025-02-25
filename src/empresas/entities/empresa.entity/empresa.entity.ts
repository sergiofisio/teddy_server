import { Cliente } from "src/clientes/entities/cliente.entity/cliente.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.empresas, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;
}
