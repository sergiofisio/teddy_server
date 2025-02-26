import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Telefone } from './entities/telefone.entity/telefone.entity';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';
import { CreateTelefoneDto } from './../dto/create-telefone.dto/create-telefone.dto';

@Injectable()
export class TelefoneService {
  constructor(
    @InjectRepository(Telefone)
    private telefoneRepository: Repository<Telefone>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createTelefoneDto: CreateTelefoneDto) {
    const telefone = this.telefoneRepository.create(createTelefoneDto);
    return this.telefoneRepository.save(telefone);
  }

  async createWithCliente(
    clienteId: number,
    createTelefoneDto: CreateTelefoneDto,
  ) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const telefone = this.telefoneRepository.create({
      ...createTelefoneDto,
      cliente,
    });

    return this.telefoneRepository.save(telefone);
  }

  async findAll() {
    return this.telefoneRepository.find();
  }

  async update(
    id: number,
    updateTelefoneDto: Partial<CreateTelefoneDto>,
  ): Promise<{ message: string }> {
    const telefone = await this.telefoneRepository.findOne({ where: { id } });

    if (!telefone) {
      throw new NotFoundException(`Telefone com ID ${id} não encontrado.`);
    }

    Object.assign(telefone, updateTelefoneDto);

    await this.telefoneRepository.save(telefone);

    return { message: 'Telefone atualizado com sucesso!' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const telefone = await this.telefoneRepository.findOne({ where: { id } });

    if (!telefone) {
      throw new NotFoundException(`Telefone com ID ${id} não encontrado.`);
    }

    await this.telefoneRepository.delete(id);

    return { message: 'Telefone removido com sucesso!' };
  }
}
