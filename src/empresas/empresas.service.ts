import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity/empresa.entity';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';
import { CreateEmpresaDto } from './../dto/create-empresa.dto/create-empresa.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    const empresa = this.empresaRepository.create(createEmpresaDto);
    return this.empresaRepository.save(empresa);
  }

  async createWithCliente(clienteId: number, createEmpresa: CreateEmpresaDto) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const telefone = this.empresaRepository.create({
      ...createEmpresa,
      cliente,
    });

    return this.empresaRepository.save(telefone);
  }

  async findAll() {
    return this.empresaRepository.find();
  }

  async update(
    id: number,
    updateEmpresaDto: Partial<CreateEmpresaDto>,
  ): Promise<{ message: string }> {
    const empresa = await this.empresaRepository.findOne({ where: { id } });

    if (!empresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada.`);
    }

    if (updateEmpresaDto.cnpj) {
      const cnpjExistente = await this.empresaRepository.findOne({
        where: { cnpj: updateEmpresaDto.cnpj },
      });

      if (cnpjExistente && cnpjExistente.id !== id) {
        throw new ConflictException(
          `CNPJ ${updateEmpresaDto.cnpj} já está cadastrado para outra empresa.`,
        );
      }
    }

    Object.assign(empresa, updateEmpresaDto);

    await this.empresaRepository.save(empresa);

    return { message: 'Empresa atualizada com sucesso!' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const deleteResult = await this.empresaRepository.delete(id);

    if (!deleteResult.affected) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada.`);
    }

    return { message: 'Empresa removida com sucesso!' };
  }
}
