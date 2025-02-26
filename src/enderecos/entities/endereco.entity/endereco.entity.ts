import { Cliente } from 'src/clientes/entities/cliente.entity/cliente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
