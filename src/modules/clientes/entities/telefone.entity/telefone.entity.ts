import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../cliente.entity/cliente.entity';

@Entity('telefones')
export class Telefone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '55' })
  codigoPais: string;

  @Column()
  codigoArea: string;

  @Column()
  numero: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.telefones, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;
}
