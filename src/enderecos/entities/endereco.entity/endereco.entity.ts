import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from './../../../clientes/entities/cliente.entity/cliente.entity';

@Entity('enderecos')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column()
  estado: string;

  @Column()
  cidade: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos, {
    onDelete: 'CASCADE',
  })
  cliente: Cliente;
}
