import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from './../../../clientes/entities/cliente.entity/cliente.entity';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ type: 'decimal', precision: 18, scale: 2 })
  valor: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.empresas, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;
}
