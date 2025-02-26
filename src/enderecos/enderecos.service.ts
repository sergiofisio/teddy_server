import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity/endereco.entity';
import { CreateEnderecoDto } from 'src/dto/create-endereco.dto/create-endereco.dto';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createEnderecoDto: CreateEnderecoDto) {
    const endereco = this.enderecoRepository.create(createEnderecoDto);
    console.log({ endereco });

    return this.enderecoRepository.save(endereco);
  }

  async createWithCliente(
    clienteId: number,
    createEndereco: CreateEnderecoDto,
  ) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const telefone = this.enderecoRepository.create({
      ...createEndereco,
      cliente,
    });

    return this.enderecoRepository.save(telefone);
  }

  async findAll() {
    return this.enderecoRepository.find();
  }

  async update(
    id: number,
    updateEnderecoDto: Partial<CreateEnderecoDto>,
  ): Promise<{ message: string }> {
    const endereco = await this.enderecoRepository.findOne({ where: { id } });

    if (!endereco) {
      throw new NotFoundException(`Endereço com ID ${id} não encontrado.`);
    }

    Object.assign(endereco, updateEnderecoDto);

    await this.enderecoRepository.save(endereco);

    return { message: 'Endereço atualizado com sucesso!' };
  }

  async remove(id: number) {
    return this.enderecoRepository.delete(id);
  }
}
