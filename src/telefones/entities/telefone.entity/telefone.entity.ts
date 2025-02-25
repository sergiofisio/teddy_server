import { Cliente } from 'src/clientes/entities/cliente.entity/cliente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('telefones')
export class Telefone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '55' })
  codigo_pais: string;

  @Column()
  codigo_area: string;

  @Column()
  numero: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.telefones, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;
}
